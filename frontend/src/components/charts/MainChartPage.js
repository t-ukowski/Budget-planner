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
import Modal from 'react-modal';
import AddIncome from '../modals/AddIncome';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

var weekStartArray = [];

function MainChartPage() {
  const [pageNum, setPageNum] = useState(0);
  const [pageSize] = useState(70);
  const [chartData, setChartData] = useState([]);

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
      ).then((res2) => res2.json())
    ])
      .then(([startAccount, balanceOperations]) => {
        // setup for all pages
        if (pageNum === 0) weekStartArray[pageNum] = startAccount;

        // setup for this page
        var data = [];
        var day = new Date();
        var futureDay = day.getDate() + pageSize * pageNum;
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

        // first dot on the chart (starting balance of the page)
        data.push({
          date: day.getFullYear() + '-' + day.getMonth() + '-' + day.getDate(),
          balance: weekStartArray[pageNum]
        });

        let tempAccount = weekStartArray[pageNum];

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

        // last dot on the chart (starting balance of the next page)
        futureDay = day.getDate() + pageSize;
        day.setDate(futureDay);
        let lastDate = day.getFullYear() + '-' + day.getMonth() + '-' + day.getDate();
        if (lastDate != data[data.length - 1].date) {
          data.push({
            date: lastDate,
            balance: Math.round((tempAccount + Number.EPSILON) * 100) / 100
          });
        }

        // setup for the next week
        weekStartArray[pageNum + 1] = tempAccount;

        setChartData(data);
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
        <button onClick={openModal}>Zaplanuj</button>

        <Modal
          ariaHideApp={false}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}>
          <AddIncome></AddIncome>
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
                <YAxis />
                <Tooltip />
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
