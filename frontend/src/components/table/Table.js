import { Button } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

/*
const colors = {
  1: 'CD5334',
  2: 'FCBF49',
  3: '003049', // 80%, 50%, 10%
}
*/

export default function Table({ balanceData }) {
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Kwota</th>
            <th>Waluta</th>
            <th>Opis</th>
            <th>Akcje</th>
          </tr>
          {balanceData.map(({ id, amount, currency, description }) => (
            <tr key={id}>
              <td>{amount}</td>
              <td>{currency}</td>
              <td>{description}</td>
              <td>
                <Button>
                  <DeleteIcon />
                </Button>
                <Button>
                  <EditIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
