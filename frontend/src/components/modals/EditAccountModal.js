import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Modal from 'react-modal';
import { modalStyle } from '../../styles/modalStyle';

export default function EditAccountModal({
  modalIsOpen,
  closeModal,
  accountName,
  accountBalance,
  id
}) {
  const [newAccountName, setNewAccountName] = useState(accountName);
  const [newAccountBalance, setNewAccountBalance] = useState(accountBalance);
  const [success, setSuccess] = useState(false);
  const [sent, setSent] = useState(false);

  function onClose() {
    setSent(false);
    setSuccess(false);
    closeModal();
  }

  function handleSubmit(event) {
    setSent(true);
    event.preventDefault();
    axios({
      method: 'put',
      url: `http://localhost:8080/changeAccount/${id}/${newAccountName}/${newAccountBalance}`
    })
      .then((res) => {
        console.log(res);
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
        <div className="title small">Edycja konta {accountName}</div>
        {!success && (
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <TextField
              id="outlined-basic"
              label="Nazwa"
              variant="outlined"
              onChange={(e) => setNewAccountName(e.target.value)}
              value={newAccountName}
              margin="normal"
            />
            <br />
            <TextField
              id="outlined-number"
              label="Stan konta"
              type="number"
              onChange={(e) => setNewAccountBalance(e.target.value)}
              value={newAccountBalance}
              margin="normal"
            />
            <br />
            <br />
            <input className="submitButton" type="submit" value="Aktualizuj" />
          </form>
        )}
        {success && 'Zedytowano konto'}
        {sent && !success && 'Edycja konta nie powiodła się'}
      </div>
    </Modal>
  );
}
