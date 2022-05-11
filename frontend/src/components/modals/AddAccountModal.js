import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Modal from 'react-modal';
import { modalStyle } from '../../styles/modalStyle';

export default function AddAccountModal({ modalIsOpen, closeModal }) {
  const [accountName, setAccountName] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [success, setSuccess] = useState(false);
  const [sent, setSent] = useState(false);

  function onClose() {
    setSent(false);
    setSuccess(false);
    setAccountName('');
    setAccountBalance(0);
    closeModal();
  }

  function handleSubmit(event) {
    setSent(true);
    event.preventDefault();
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
      </div>
    </Modal>
  );
}
