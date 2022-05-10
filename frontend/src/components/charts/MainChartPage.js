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
import Modal from 'react-modal';
import AddIncome from '../modals/AddIncome';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

var data = [];

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
  const [tooltipDate, setTooltipDate] = useState('');
  const [sidePanel, setSidePanel] = useState([]);

  var tempMinRange = Infinity,
    tempMaxRange = -Infinity;

  function minmaxAccount(account) {
    let delta = 0.02;
    let valMax = account * (1 + delta);
    let valMin = account * (1 - delta);
    if (valMax > tempMaxRange) tempMaxRange = Math.round((valMax + Number.EPSILON) / 100) * 100;
    if (valMin < tempMinRange) tempMinRange = Math.round((valMin + Number.EPSILON) / 100) * 100;
  }

  const CustomTooltip = ({ active, label, payload }) => {
    var tooltip = null;

    useEffect(() => {
      if (active) setTooltipDate(label);
      else setTooltipDate('');
    });

    if (active) {
      tooltip = (
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

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
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
        data = [];
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
          expenses: [],
          incomes: []
        });

        let tempAccount = weekStartArray[pageNum];
        minmaxAccount(tempAccount);

        // expenses and incomes
        var tempExpenses = [];
        var tempIncomes = [];
        for (let operation of balanceOperations) {
          tempAccount += operation.type === 'Wydatek' ? -operation.amount : operation.amount;
          minmaxAccount(tempAccount);
          operation.type === 'Wydatek'
            ? tempExpenses.push({
                name: operation.description,
                amount: operation.amount,
                account: operation.bankAccount.accountName
              })
            : tempIncomes.push({
                name: operation.description,
                amount: operation.amount,
                account: operation.bankAccount.accountName
              });
          if (operation.billingDate == data[data.length - 1].date) {
            data[data.length - 1].balance = tempAccount;
            data[data.length - 1].expenses = data[data.length - 1].expenses.concat(tempExpenses);
            data[data.length - 1].incomes = data[data.length - 1].incomes.concat(tempIncomes);
          } else {
            data.push({
              date: operation.billingDate,
              balance: Math.round((tempAccount + Number.EPSILON) * 100) / 100,
              expenses: tempExpenses,
              incomes: tempIncomes
            });
          }
          tempExpenses = [];
          tempIncomes = [];
        }

        // last dot on the chart (starting balance of the next page)
        futureDay = day.getDate() + pageSize;
        day.setDate(futureDay);
        let lastDate = stringifyDate(day);
        if (lastDate != data[data.length - 1].date) {
          data.push({
            date: lastDate,
            balance: Math.round((tempAccount + Number.EPSILON) * 100) / 100,
            expenses: [],
            incomes: []
          });
        }

        setChartParams({
          minRange: tempMinRange,
          maxRange: tempMaxRange
        });
        // setup for the next week
        weekStartArray[pageNum + 1] = tempAccount;

        // set reference lines
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

        console.log(data);
        setChartData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNum]);

  useEffect(() => {
    var tempSidePanel = [];

    if (tooltipDate != '') {
      var expenses = [];
      var incomes = [];
      data.forEach((element) => {
        if (element.date === tooltipDate) {
          expenses = element.expenses;
          incomes = element.incomes;
        }
      });
      tempSidePanel.push(
        <p key="1">
          <b>Data: </b>
          {tooltipDate}
        </p>
      );
      if (expenses.length !== 0) {
        tempSidePanel.push(
          <p key="wydatki">
            <b>Wydatki</b>
          </p>
        );
        let i = 5;
        expenses.forEach((element) => {
          tempSidePanel.push(
            <div className="expense" key={i}>
              Nazwa: {element.name}
              <br />
              Kwota: {element.amount}zł
              <br />
              Konto: {element.account}
            </div>
          );
          i++;
        });
      }
      if (incomes.length !== 0) {
        tempSidePanel.push(
          <p key="przychody">
            <b>Przychody</b>
          </p>
        );
        let i = -5;
        incomes.forEach((element) => {
          tempSidePanel.push(
            <div className="expense" key={i}>
              Nazwa: {element.name}
              <br />
              Kwota: {element.amount}zł
              <br />
              Konto: {element.account}
            </div>
          );
          i--;
        });
      }
    } else {
      tempSidePanel.push(
        <p key="1">
          Najedź na wykres, by zobaczyć
          <b> szczegóły wydatków</b>
        </p>
      );
    }
    setSidePanel(tempSidePanel);
  }, [tooltipDate]);

  return (
    <div className="flexCard">
      <div className="mainCard">
        <div className="titleCard">
          <Title text="Przewidywany stan konta" />
          <button className="openModalButton" onClick={openModal}>
            Zaplanuj
          </button>
        </div>

        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}>
          <button className="closeModalButton" onClick={closeModal}>
            X
          </button>
          <AddIncome />
        </Modal>

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
        <div className="expensesCard">{sidePanel}</div>
      </div>
    </div>
  );
}

export default MainChartPage;
