import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/AddBox';
import AddAccountModal from '../modals/AddAccountModal';
import Title from '../page/Title';
// import { buttonStyleSmall } from '../../styles/buttonStyle';
import Account from './Account';
// import axios from 'axios';

export default function Accounts() {
  const [accountsList, setAccountsList] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    fetch('http://localhost:8080/AccountsList')
      .then((res) => res.json())
      .then((json) => setAccountsList(json));
  });

  return (
    <>
      <Title text="Saldo" />
      <AddAccountModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      {accountsList.map(({ id, accountBalance, accountName }) => (
        <Account key={id} id={id} accountBalance={accountBalance} accountName={accountName} />
      ))}
      <Button className="iconButton big" onClick={openModal}>
        <AddIcon className="icon" />
      </Button>
    </>
  );
}
