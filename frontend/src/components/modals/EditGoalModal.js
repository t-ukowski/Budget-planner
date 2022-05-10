import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default function EditGoalModal({ modalIsOpen, closeModal, goal }) {
  const [goalName, setGoalName] = useState('');
  const [success, setSuccess] = useState(false);
  const [sent, setSent] = useState(false);

  function onClose() {
    setSent(false);
    setSuccess(false);
    setGoalName('');
    closeModal();
  }

  function handleSubmit(event) {
    setSent(true);
    event.preventDefault();
    axios({
      method: 'put',
      url: `http://localhost:8080/goals/${goal.id}`,
      params: {
        goalName: goalName
      }
    })
      .then((res) => {
        if (res.status === 200) setSuccess(true);
        else setSuccess(false);
      })
      .catch((err) => console.log(err.data));
  }

  return (
    <Modal ariaHideApp={false} isOpen={modalIsOpen} onRequestClose={onClose} style={customStyles}>
      <button className="closeModalButton" onClick={onClose}>
        X
      </button>
      <div className="modal-inside">
        <div className="title small">Edycja celu {goal.name}</div>
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
            <input className="submitButton" type="submit" value="Edytuj" />
          </form>
        )}
        {success && 'Edycja zakończona'}
        {sent && !success && 'Edycja celu nie powiodła się'}
      </div>
    </Modal>
  );
}
