import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Modal from 'react-modal';
import { modalStyle } from '../../styles/modalStyle';

export default function AddAccountModal({
  modalIsOpen,
  closeModal,
  updateNeeded,
  setUpdateNeeded
}) {
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [success, setSuccess] = useState(false);
  const [sent, setSent] = useState(false);
  const [accExists, setAccExists] = useState(false);
  const [accountNames, setAccountNames] = useState('');

  function onClose() {
    setUpdateNeeded(updateNeeded);
    setAccExists(false);
    setSent(false);
    setSuccess(false);
    setAccountName('');
    setAccountBalance(0);
    closeModal();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (accountNames.includes(accountName)) {
      setAccExists(true);
    } else {
      setSent(true);
      axios({
        method: 'post',
        url: 'http://localhost:8080/addAccount',
        params: {
          accountName: accountName,
          accountBalance: accountBalance
        }
      })
        .then((res) => {
          if (res.status === 201) setSuccess(true);
          else setSuccess(false);
        })
        .catch((err) => console.log(err.data));
    }
  }

  useEffect(() => {
    fetch('http://localhost:8080/AccountsList')
      .then((res) => res.json())
      .then((json) => {
        setAccountNames(json.map((obj) => obj.accountName));
      });
  }, [updateNeeded]);

  return (
    <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={onClose} style={modalStyle}>
      <button className="closeModalButton" onClick={onClose}>
        X
      </button>
      <div className="modal-inside">
        <div className="title small">Nowe konto</div>
        {!success && (
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <TextField
              id="outlined-basic"
              label="Nazwa"
              variant="outlined"
              onChange={(e) => setAccountName(e.target.value)}
              value={accountName}
              margin="normal"
            />
            <br />
            <TextField
              id="outlined-number"
              label="Stan konta"
              type="number"
              onChange={(e) => setAccountBalance(e.target.value)}
              value={accountBalance}
              margin="normal"
            />
            <br />
            <br />
            <input className="submitButton" type="submit" value="Dodaj" />
          </form>
        )}
        {success && 'Dodano konto'}
        {sent && !success && 'Dodawanie konta nie powiodło się'}
        {accExists && 'Podane konto już istnieje!'}
      </div>
    </Modal>
  );
}
