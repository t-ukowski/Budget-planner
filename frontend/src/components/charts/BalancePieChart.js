import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const colors = ['#E38627', '#C13C37', '#6A2135', '#CD5334', '#FCBF49'];

export default function BalancePieChart() {
  let sum = 0.0;
  let chartData = [];

  const [accountsList, setAccountsList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/AccountsList')
      .then((res) => res.json())
      .then((json) => setAccountsList(json));
  });

  accountsList.map((item, index) => {
    let insert = {
      color: colors[index],
      title: item.acoountName,
      value: parseInt(`${item.accountBalance}`)
    };

    chartData.push(insert);
  });
  accountsList.forEach((item) => (sum = sum + item.accountBalance));

  return (
    <div className="piechart-container">
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
      <div className="balance center">
        <div className="text">{sum} PLN</div>
      </div>
    </div>
  );
}
