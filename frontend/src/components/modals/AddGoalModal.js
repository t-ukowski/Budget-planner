import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Switch from '@mui/material/Switch';
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

export default function AddGoalModal({ modalIsOpen, closeModal }) {
  const [type, setType] = useState('');
  const [billingDate, setBillingDate] = useState('');
  const [endBillingDate, setEndBillingDate] = useState('');
  const [repeatInterval, setRepeatInterval] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [accountName, setAccountName] = useState('');

  const types = ['Wydatek', 'Przychód'];
  const [accounts, setAccounts] = useState([]);

  const [checkedRepeat, setCheckedRepeat] = useState(false);
  const [checkedNotifications, setCheckedNotifications] = useState(false);

  const handleRepeatChange = (event) => {
    setCheckedRepeat(event.target.checked);
  };

  const handleNotificationsChange = (event) => {
    setCheckedNotifications(event.target.checked);
  };

  useEffect(() => {
    fetch('http://localhost:8080/AccountsList')
      .then((res) => res.json())
      .then((json) => {
        setAccounts(json.map((obj) => obj.accountName));
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8080/incomes-expenses',
      params: {
        billingDate: billingDate,
        endBillingDate: endBillingDate ? endBillingDate : billingDate,
        repeatInterval: repeatInterval ? repeatInterval : 0,
        amount: amount,
        description: description,
        recipient: recipient,
        accountName: accountName,
        type: type
      }
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err.data));
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}>
      <button className="closeModalButton" onClick={closeModal}>
        X
      </button>
      <div className="modal-inside">
        <div className="title small">Planowanie</div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}>
          <Autocomplete
            name="type"
            id="select-type"
            value={type}
            onChange={(event, newType) => {
              setType(newType);
            }}
            isOptionEqualToValue={(option, value) => option === value || value === ''}
            sx={{ width: 210 }}
            options={types}
            autoHighlight
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                margin="normal"
                {...params}
                label="Typ"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password' // disable autocomplete and autofill
                }}
              />
            )}
          />
          <TextField
            id="outlined-basic"
            label="Nazwa"
            variant="outlined"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            margin="normal"
          />
          <TextField
            id="outlined-number"
            label="Kwota"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            margin="normal"
          />
          <br />
          <TextField
            type="date"
            id="outlined-date"
            variant="outlined"
            onChange={(e) => setBillingDate(e.target.value)}
            value={billingDate}
            helperText="Data"
            margin="normal"
            sx={{ width: 210 }}
          />
          <Switch
            checked={checkedRepeat}
            onChange={handleRepeatChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <p>Powtarzaj cyklicznie</p>
          <br />
          {checkedRepeat && (
            <>
              <TextField
                id="outlined-number"
                label="Co ile dni powtarzać"
                type="number"
                onChange={(e) => setRepeatInterval(e.target.value)}
                value={repeatInterval}
                margin="normal"
              />
              <TextField
                type="date"
                id="outlined-date"
                variant="outlined"
                onChange={(e) => setEndBillingDate(e.target.value)}
                value={endBillingDate}
                helperText="Data końcowa"
                margin="normal"
                sx={{ width: 210 }}
              />
              <br />
            </>
          )}
          <TextField
            id="outlined-basic"
            label="Odbiorca"
            variant="outlined"
            onChange={(e) => setRecipient(e.target.value)}
            value={recipient}
            margin="normal"
          />
          <Autocomplete
            name="account"
            id="select-account"
            value={accountName}
            onChange={(event, newAccount) => {
              setAccountName(newAccount);
            }}
            sx={{ width: 210 }}
            options={accounts}
            isOptionEqualToValue={(option, value) => option === value || value === ''}
            autoHighlight
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                label="Konto"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: 'new-password' // disable autocomplete and autofill
                }}
              />
            )}
          />
          <Switch
            checked={checkedNotifications}
            onChange={handleNotificationsChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <p>Wysyłaj powiadomienia</p>
          <br />
          <br />
          <input className="submitButton" type="submit" value="Dodaj" />
        </form>
      </div>
    </Modal>
  );
}
