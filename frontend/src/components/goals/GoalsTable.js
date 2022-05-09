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
            <th>Id</th>
            <th>Nazwa</th>
          </tr>
          {goalsData.map(({ id, goalName }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{goalName}</td>
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
