import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/AddBox';

export default function AccountsList() {
  const [accountsList, setAccountsList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/AccountsList')
      .then((res) => res.json())
      .then((json) => setAccountsList(json));
  });

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>Konto</th>
            <th>Stan</th>
            <th>Akcje</th>
          </tr>
          {accountsList.map(({ id, accountBalance, accountName }) => (
            <tr key={id}>
              <td>{accountName}</td>
              <td>{accountBalance}</td>
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
