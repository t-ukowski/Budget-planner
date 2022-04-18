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

function MainChartPage() {
  const [page, setPage] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log('Cart reloading');
    setChartData([
      {
        date: '12-20-2020',
        balance: 10202
      },
      {
        date: '13-20-2020',
        balance: 12202
      },
      {
        date: '13-20-2020',
        balance: 9002
      },
      {
        date: '15-20-2020',
        balance: 8202
      },
      {
        date: '20-20-2020',
        balance: 14202
      },
      {
        date: '23-20-2020',
        balance: 17202
      },
      {
        date: '25-20-2020',
        balance: 13202
      }
    ]);
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
