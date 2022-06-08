import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Modal from 'react-modal';
import { modalStyle } from '../../styles/modalStyle';

export default function AddGoalModal({ modalIsOpen, closeModal }) {
  const [goalName, setGoalName] = useState('');
  const [cost, setCost] = useState(0);
  const [success, setSuccess] = useState(false);
  const [sent, setSent] = useState(false);

  function onClose() {
    setSent(false);
    setSuccess(false);
    setGoalName('');
    setCost(0);
    closeModal();
  }

  function handleSubmit(event) {
    setSent(true);
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8080/goals',
      params: {
        goalName: goalName,
        cost: cost,
        goalElementName: goalName
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
        <div className="title small">Nowy cel</div>
        {!success && (
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <TextField
              id="outlined-basic"
              label="Nazwa"
              variant="outlined"
              onChange={(e) => setGoalName(e.target.value)}
              value={goalName}
              margin="normal"
            />
            <br />
            <TextField
              id="outlined-number"
              label="Kwota"
              type="number"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              margin="normal"
            />
            <br />
            <br />
            <input disabled={cost < 0} className="submitButton" type="submit" value="Dodaj" />
          </form>
        )}
        {success && 'Dodano cel'}
        {sent && !success && 'Dodawanie celu nie powiodło się'}
        {cost < 0 && 'Cel nie może mieć kwoty mniejszej niż 0'}
      </div>
    </Modal>
  );
}
