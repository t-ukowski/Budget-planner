import React from 'react';
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
  const data = [
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
  ];
  return (
    <div className="flexCard">
      <div className="mainCard">
        <div className="titleCard">
          <Title text="Przewidywany stan konta" />
        </div>
        <div className="chartCard">
          <div className="chartCardInside">
            <ResponsiveContainer width="95%" height="95%">
              <LineChart data={data}>
                <Line type="monotone" dataKey="balance" stroke="#003049" strokeWidth={3} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
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
