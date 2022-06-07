import React, { useState, useEffect } from 'react';
import MoreButton from './MoreButton';

function MainPage({ updateNeeded }) {
  const [balanceData, setBalanceData] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/TotalBalance')
      .then((res) => res.json())
      .then((json) => setBalanceData(json));
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
          </div>
          <div className="more_button_container">
            <MoreButton to="cashflow" />
          </div>
        </div>
        <div className="scoreboard small">
          <div className="content">
            <div className="heading2">Przychody</div>
          </div>
          <div className="more_button_container">
            <MoreButton to="cashflow" />
          </div>
        </div>
      </div>
      <div className="scoreboard large">
        <div className="content">
          <div className="heading2">Cele</div>
        </div>
        <div className="more_button_container">
          <MoreButton to="objectives" />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
