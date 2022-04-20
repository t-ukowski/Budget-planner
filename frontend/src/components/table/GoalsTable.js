import { Button } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/AddBox';

export default function GoalsTable({ goalsData }) {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Kwota</th>
            <th>Waluta</th>
            <th>Przewidywana data realizacji</th>
            <th>Opis</th>
            <th>Akcje</th>
          </tr>
          {goalsData.map(({ id, amount, currency, expectedDate, description }) => (
            <tr key={id}>
              <td>{amount}</td>
              <td>{currency}</td>
              <td>{expectedDate}</td>
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
      <Button className="addButton">
        <AddIcon className="icon" />
      </Button>
    </>
  );
}
