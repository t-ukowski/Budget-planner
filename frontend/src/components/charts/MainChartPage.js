import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import Title from '../page/Title';

const months = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
var weekStartArray = [];

function MainChartPage() {
  const [page, setPage] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log('Cart reloading');

    Promise.all([
      fetch(`http://localhost:8080/TotalBalance`).then((res1) => res1.json()),
      fetch(`http://localhost:8080/BalanceOperations?page=${page}`).then((res2) => res2.json())
    ])
      .then(([startAccount, balanceOperations]) => {
        // setup for all weeks
        if (page === 0) weekStartArray[page] = startAccount;

        // setup for this week
        var data = [];
        var day = new Date();
        var futureDay = day.getDate() + 7 * page;
        day.setDate(futureDay);

        console.log(balanceOperations);
        balanceOperations.sort(function (a, b) {
          if (a.billingDate < b.billingDate) {
            return -1;
          }
          if (a.billingDate > b.billingDate) {
            return 1;
          }
          return 0;
        });
        console.log(balanceOperations);

        // first dot on the chart (starting balance of the week)
        data.push({
          date: months[day.getMonth()] + ' ' + day.getDate() + ', ' + day.getFullYear(),
          balance: weekStartArray[page]
        });

        let tempAccount = weekStartArray[page];

        // expenses and incomes
        for (let operation of balanceOperations) {
          tempAccount += operation.type === 'Wydatek' ? -operation.amount : operation.amount;
          if (operation.billingDate == data[data.length - 1].date)
            data[data.length - 1].balance = tempAccount;
          else {
            data.push({
              date: operation.billingDate,
              balance: Math.round((tempAccount + Number.EPSILON) * 100) / 100
            });
          }
        }

        // last dot on the chart (starting balance of the next week)
        futureDay = day.getDate() + 7 * (page + 1);
        day.setDate(futureDay);
        let lastDate = months[day.getMonth()] + ' ' + day.getDate() + ', ' + day.getFullYear();
        if (lastDate != data[data.length - 1].date) {
          data.push({
            date: lastDate,
            balance: Math.round((tempAccount + Number.EPSILON) * 100) / 100
          });
        }

        // setup for the next week
        weekStartArray[page + 1] = tempAccount;

        setChartData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  return (
    <div className="flexCard">
      <div className="mainCard">
        <div className="titleCard">
          <Title text="Przewidywany stan konta" />
        </div>
        <div className="chartCard">
          <div className="chartCardInside">
            <button disabled={page <= 0 ? true : false} onClick={() => setPage(page - 1)}>
              ❮
            </button>
            <ResponsiveContainer width="95%" height="95%">
              <LineChart data={chartData}>
                <Line type="monotone" dataKey="balance" stroke="#003049" strokeWidth={3} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
            <button onClick={() => setPage(page + 1)}>❯</button>
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
