import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
// import { styled } from '@mui/material/styles';
// import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

/*
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));
*/

const colors = ['#E38627', '#C13C37', '#6A2135', '#CD5334', '#FCBF49'];

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
      color: colors[index],
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
