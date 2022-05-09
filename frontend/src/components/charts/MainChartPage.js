import React, { useState, useEffect, useReducer } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
  Label
} from 'recharts';
import Title from '../page/Title';

var data = [];

const CustomTooltip = ({ active, label, payload }) => {
  if (active) {
    var expenses;
    data.forEach((element) => {
      if (element.date === label) {
        expenses = element.expenses;
      }
    });
    console.log(expenses);
    var tooltip = (
      <div className="tooltip">
        <p>
          <b>Data: </b>
          {label}
        </p>
        <p>
          <b>Stan konta: </b>
          {payload[0].value}zł
        </p>
      </div>
    );

    return tooltip;
  }

  return null;
};

var weekStartArray = [];

function stringifyDate(day) {
  return (
    day.getFullYear() +
    '-' +
    ('0' + (day.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + day.getDate()).slice(-2)
  );
}

function MainChartPage() {
  const [pageNum, setPageNum] = useState(0);
  const [pageSize] = useState(30);
  const [chartData, setChartData] = useState([]);
  const [chartParams, setChartParams] = useReducer(
    (chartParams, newChartParams) => ({ ...chartParams, ...newChartParams }),
    { minRange: Infinity, maxRange: -Infinity }
  );
  const [referenceLines, setReferenceLines] = useState([]);

  var tempMinRange = Infinity,
    tempMaxRange = -Infinity;

  function minmaxAccount(account) {
    let delta = 0.02;
    let valMax = account * (1 + delta);
    let valMin = account * (1 - delta);
    if (valMax > tempMaxRange) tempMaxRange = Math.round((valMax + Number.EPSILON) / 100) * 100;
    if (valMin < tempMinRange) tempMinRange = Math.round((valMin + Number.EPSILON) / 100) * 100;
  }

  useEffect(() => {
    console.log('Cart reloading');

    Promise.all([
      fetch(`http://localhost:8080/TotalBalance`).then((res1) => res1.json()),
      fetch(
        `http://localhost:8080/BalanceOperations?page=${pageNum}&chartInterval=${pageSize}`
      ).then((res2) => res2.json()),
      fetch(`http://localhost:8080/GoalRealization`).then((res3) => res3.json())
    ])
      .then(([startAccount, balanceOperations, goalRealization]) => {
        // setup for all pages
        if (pageNum === 0) weekStartArray[pageNum] = startAccount;

        // setup for this page
        var day = new Date();
        var futureDay = day.getDate() + pageSize * pageNum;
        day.setDate(futureDay);
        tempMinRange = Infinity;
        tempMaxRange = -Infinity;

        balanceOperations.sort(function (a, b) {
          if (a.billingDate < b.billingDate) {
            return -1;
          }
          if (a.billingDate > b.billingDate) {
            return 1;
          }
          return 0;
        });

        // first dot on the chart (starting balance of the page)
        data.push({
          date: stringifyDate(day),
          balance: weekStartArray[pageNum],
          expenses: []
        });

        let tempAccount = weekStartArray[pageNum];
        minmaxAccount(tempAccount);

        // expenses and incomes
        var tempExpenses = [];
        for (let operation of balanceOperations) {
          tempAccount += operation.type === 'Wydatek' ? -operation.amount : operation.amount;
          minmaxAccount(tempAccount);
          tempExpenses.push({
            name: operation.description,
            amount: operation.amount,
            account: operation.bankAccount.accountName,
            type: operation.type
          });
          if (operation.billingDate == data[data.length - 1].date)
            data[data.length - 1].balance = tempAccount;
          else {
            data.push({
              date: operation.billingDate,
              balance: Math.round((tempAccount + Number.EPSILON) * 100) / 100,
              expenses: tempExpenses
            });
            tempExpenses = [];
          }
        }

        // last dot on the chart (starting balance of the next page)
        futureDay = day.getDate() + pageSize;
        day.setDate(futureDay);
        let lastDate = stringifyDate(day);
        if (lastDate != data[data.length - 1].date) {
          data.push({
            date: lastDate,
            balance: Math.round((tempAccount + Number.EPSILON) * 100) / 100,
            expenses: []
          });
        }

        setChartParams({
          minRange: tempMinRange,
          maxRange: tempMaxRange
        });
        // setup for the next week
        weekStartArray[pageNum + 1] = tempAccount;

        // set reference lines
        setChartData(data);
        var tempReferenceLines = [];
        var multipleGoals = [];
        for (let i = 0; i < goalRealization.length; i++) {
          const element = goalRealization[i];
          if (i < goalRealization.length - 1) {
            const next_element = goalRealization[i + 1];
            multipleGoals.push(element.goal.goalName);
            if (next_element.date !== element.date) {
              tempReferenceLines.push(
                <ReferenceLine
                  x={element.date}
                  stroke="#CD5334"
                  strokeWidth={2}
                  strokeDasharray="8 3"
                  key={i}
                  className="label">
                  <Label color="#CD5334" value={'Cel: ' + multipleGoals} position="insideTopLeft" />
                </ReferenceLine>
              );
              multipleGoals = [];
            }
          } else {
            multipleGoals.push(element.goal.goalName);
            tempReferenceLines.push(
              <ReferenceLine
                x={element.date}
                stroke="#CD5334"
                strokeWidth={2}
                strokeDasharray="8 3"
                key={i}
                className="label">
                <Label color="#CD5334" value={'Cel: ' + multipleGoals} position="insideTopLeft" />
              </ReferenceLine>
            );
          }
        }
        setReferenceLines(tempReferenceLines);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNum]);

  return (
    <div className="flexCard">
      <div className="mainCard">
        <div className="titleCard">
          <Title text="Przewidywany stan konta" />
        </div>
        <div className="chartCard">
          <div className="chartCardInside">
            <button disabled={pageNum <= 0 ? true : false} onClick={() => setPageNum(pageNum - 1)}>
              ❮
            </button>
            <ResponsiveContainer width="95%" height="95%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="balance" stroke="#003049" strokeWidth={3} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis domain={[chartParams.minRange, chartParams.maxRange]} />
                <Tooltip content={<CustomTooltip />} />
                {referenceLines}
              </LineChart>
            </ResponsiveContainer>
            <button onClick={() => setPageNum(pageNum + 1)}>❯</button>
          </div>
        </div>
      </div>
      <div className="sideCard">
        <div className="calendarCard">Calendar</div>
        <div className="expensesCard">Expenses</div>
      </div>
    </div>
  );
}

export default MainChartPage;
