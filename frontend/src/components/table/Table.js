import React from 'react';
// import { BalanceData } from './BalanceData';

const tableStyle = {
  border: '1px solid black',
  borderCollapse: 'collapse'
};

const tdStyle = {
  border: '1px solid black'
};

export default function Table({ balanceData }) {
  return (
    <div>
      <table style={tableStyle}>
        <tbody>
          <tr>
            <th style={tdStyle}>Kwota</th>
            <th style={tdStyle}>Waluta</th>
            <th style={tdStyle}>Opis</th>
          </tr>
          {balanceData.map(({ id, amount, currency, description }) => (
            <tr key={id}>
              <td style={tdStyle}>{amount}</td>
              <td style={tdStyle}>{currency}</td>
              <td style={tdStyle}>{description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
