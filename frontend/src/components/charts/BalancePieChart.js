import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { piechartColors } from '../../styles/piechart';

export default function BalancePieChart() {
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [accountsList, setAccountsList] = useState([]);

  /*
  useEffect(() => {
    fetch('http://localhost:8080/AccountsList')
      .then((res) => res.json())
      .then((json) => setAccountsList(json))
      .then(
        accountsList.map((item, index) => {
          let insert = {
            color: colors[index],
            title: `${item.accountName} ${item.accountBalance}`,
            value: parseInt(`${item.accountBalance}`)
          };
          chartData.push(insert);
        })
      )
      .then(accountsList.forEach((item) => (sum = sum + item.accountBalance)));
  });
*/
  let sum = 0.0;
  let chartData = [];

  function mouseEnter() {
    setIsMouseInside(true);
  }

  function mouseLeave() {
    setIsMouseInside(false);
  }

  useEffect(() => {
    fetch('http://localhost:8080/AccountsList')
      .then((res) => res.json())
      .then((json) => setAccountsList(json));
  });

  accountsList.map((item, index) => {
    let insert = {
      color: piechartColors[index],
      title: `${item.accountName} ${item.accountBalance}`,
      value: parseInt(`${item.accountBalance}`)
    };

    chartData.push(insert);
  });

  accountsList.forEach((item) => (sum = sum + item.accountBalance));

  return (
    <div className="piechart-container" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <PieChart
        className="piechart center"
        data={chartData}
        //rounded
        lineWidth={60} // szerokość tego kółka w środku
        // Line width of each segment. Percentage of chart's radius
        radius={49} // promień całości
        segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
        animate
        viewBoxSize={[100, 100]}
      />
      {!isMouseInside && (
        <div className="balance center">
          <div className="text">{sum} PLN</div>
        </div>
      )}
    </div>
  );
}
