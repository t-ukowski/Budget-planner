import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/AddBox';
import AddAccountModal from '../modals/AddAccountModal';
import Title from '../page/Title';
import { addButtonStyleSmall } from '../../styles/buttonStyle';
import Account from './Account';
import BalancePieChart from '../charts/BalancePieChart';
import { piechartColors } from '../../styles/piechart';

export default function Accounts({ updateNeeded, setUpdateNeeded }) {
  const [accountsList, setAccountsList] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setUpdateNeeded(!updateNeeded);
  }

  /*
  function addColor() {
    const accountsWithColors = accountsList.map(({ id, accountBalance, accountName }, index) => ({
      id: id,
      accountBalance: accountBalance,
      accountName: accountName,
      color: piechartColors[index]
    }));
    setAccountsList(accountsWithColors);
  }
*/

  useEffect(() => {
    fetch('http://localhost:8080/AccountsList')
      .then((res) => res.json())
      .then((json) => {
        setAccountsList(
          json.map((account, index) => ({
            id: account.id,
            accountBalance: account.accountBalance,
            accountName: account.accountName,
            color: piechartColors[index]
          }))
        );
      });
    // .then(addColor());
  }, [updateNeeded]);

  return (
    <>
      <Title text="Saldo" />
      <AddAccountModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      <table>
        <tbody>
          <tr>
            <th>Konto</th>
            <th>Saldo</th>
            <th>Akcje</th>
          </tr>
          {accountsList.map(({ id, accountBalance, accountName, color }) => (
            <Account
              key={id}
              id={id}
              accountBalance={accountBalance}
              accountName={accountName}
              updateNeeded={updateNeeded}
              setUpdateNeeded={setUpdateNeeded}
              color={color}
            />
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <Button className="iconButton small" sx={addButtonStyleSmall} onClick={openModal}>
        <AddIcon className="icon" />
      </Button>
      <BalancePieChart />
    </>
  );
}
