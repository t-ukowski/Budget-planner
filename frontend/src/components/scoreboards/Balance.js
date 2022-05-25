import React, { useState, useEffect } from 'react';

function Balance({ updateNeeded }) {
  const [balanceData, setBalanceData] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/TotalBalance')
      .then((res) => res.json())
      .then((json) => setBalanceData(json));
  }, [updateNeeded]);

  return (
    <div className="scoreboard large">
      <div className="heading2">Stan konta</div>
      <div className="heading1">{balanceData} PLN</div>
    </div>
  );
}

export default Balance;
