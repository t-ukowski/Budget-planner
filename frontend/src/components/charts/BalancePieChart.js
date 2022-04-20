import { PieChart } from 'react-minimal-pie-chart';

const BalanceData = [
  {
    id: 1,
    amount: 156,
    currency: 'PLN',
    description: 'Portfel',
    color: '#E38627'
  },
  {
    id: 2,
    amount: 2500,
    currency: 'PLN',
    description: 'Konto główne',
    color: '#C13C37'
  },
  {
    id: 3,
    amount: 500,
    currency: 'PLN',
    description: 'Lokata',
    color: '#6A2135'
  },
  {
    id: 4,
    amount: 124,
    currency: 'PLN',
    description: 'Skarpeta',
    color: '#6A2135'
  },
  {
    id: 5,
    amount: 17,
    currency: 'PLN',
    description: 'Prawa kieszeń',
    color: '#6A2135'
  }
];

export default function BalancePieChart() {
  let chartData = [];
  BalanceData.map((item) => {
    let insert = {
      color: item.color,
      title: item.description,
      value: item.amount
    };

    chartData.push(insert);
  });

  return (
    <PieChart
      data={chartData}
      //rounded
      lineWidth={90} // szerokość tego kółka w środku
      radius={25} // promień całości
      segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
      animate
    />
  );
}
