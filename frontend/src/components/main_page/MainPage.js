import React, { useState, useEffect } from 'react';
import MoreButton from './MoreButton';

function MainPage({ updateNeeded }) {
  const [balanceData, setBalanceData] = useState(0);
  const [expensePanel, setExpensePanel] = useState([]);
  const [incomePanel, setIncomePanel] = useState([]);
  const [goalsPanel, setGoalsPanel] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/TotalBalance')
      .then((res) => res.json())
      .then((json) => setBalanceData(json));
    fetch(`http://localhost:8080/BalanceOperations?page=0&chartInterval=60`)
      .then((res2) => res2.json())
      .then((balanceOperations) => {
        balanceOperations.sort(function (a, b) {
          if (a.billingDate < b.billingDate) {
            return -1;
          }
          if (a.billingDate > b.billingDate) {
            return 1;
          }
          return 0;
        });

        let counter = 0;
        var i = 78067;
        var tempExpensePanel = [];
        for (let operation of balanceOperations) {
          if (operation.type === 'Wydatek') {
            tempExpensePanel.push(
              <li key={i}>
                <b>{operation.description}</b>
              </li>
            );
            tempExpensePanel.push(<li key={i + 1}>{operation.billingDate}</li>);
            tempExpensePanel.push(
              <li key={i + 2}>
                <b>{operation.amount}zł</b>
              </li>
            );
            counter++;
          }
          i += 3;
          if (counter === 3) break;
        }
        setExpensePanel(<ul className="incomes_list">{tempExpensePanel}</ul>);
        counter = 0;
        var tempIncomePanel = [];
        for (let operation of balanceOperations) {
          if (operation.type !== 'Wydatek') {
            tempIncomePanel.push(
              <li key={i}>
                <b>{operation.description}</b>
              </li>
            );
            tempIncomePanel.push(<li key={i + 1}>{operation.billingDate}</li>);
            tempIncomePanel.push(
              <li key={i + 2}>
                <b>{operation.amount}zł</b>
              </li>
            );
            counter++;
          }
          i += 3;
          if (counter === 3) break;
        }
        setIncomePanel(<ul className="incomes_list">{tempIncomePanel}</ul>);
      });
    fetch('http://localhost:8080/GoalRealization')
      .then((res) => res.json())
      .then((goals) => {
        var counter = 0;
        var i = 780367;
        var tempGoalsPanel = [];
        for (let goal of goals) {
          console.log(goal);
          console.log(i);
          tempGoalsPanel.push(
            <li key={i}>
              <div className="li_goal">{goal.goal.goalName}</div>
            </li>
          );
          tempGoalsPanel.push(
            <li key={i + 1}>
              Najbliższa możliwa data realizacji: <b>{goal.date}</b>
            </li>
          );
          counter++;
          i += 2;
          if (counter === 3) break;
        }
        setGoalsPanel(<ul className="goals_list">{tempGoalsPanel}</ul>);
      });
  }, [updateNeeded]);

  return (
    <div className="main_page">
      <div className="scoreboard large">
        <div className="content">
          <div className="heading2">Stan konta</div>
          <div className="heading1">{balanceData} PLN</div>
        </div>
        <div className="more_button_container">
          <MoreButton to="account" />
        </div>
      </div>
      <div className="income_scoreboards">
        <div className="scoreboard small">
          <div className="content">
            <div className="heading2">Wydatki</div>
            {expensePanel}
          </div>
          <div className="more_button_container">
            <MoreButton to="cashflow" />
          </div>
        </div>
        <div className="scoreboard small">
          <div className="content">
            <div className="heading2">Przychody</div>
            {incomePanel}
          </div>
          <div className="more_button_container">
            <MoreButton to="cashflow" />
          </div>
        </div>
      </div>
      <div className="scoreboard large">
        <div className="content">
          <div className="heading2">Cele</div>
          {goalsPanel}
        </div>
        <div className="more_button_container">
          <MoreButton to="objectives" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
