import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AddIncome() {
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
        endBillingDate: endBillingDate,
        repeatInterval: repeatInterval,
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
          sx={{ width: 300 }}
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

        <br />
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
        />

        <TextField
          type="date"
          id="outlined-date"
          variant="outlined"
          onChange={(e) => setEndBillingDate(e.target.value)}
          value={endBillingDate}
          helperText="Data końcowa"
          margin="normal"
        />

        <TextField
          id="outlined-number"
          label="Co ile dni powtarzać"
          type="number"
          onChange={(e) => setRepeatInterval(e.target.value)}
          value={repeatInterval}
          margin="normal"
        />
        <br />

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
          sx={{ width: 300 }}
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
        <br />
        <input className="submitButton" type="submit" value="Dodaj" />
      </form>
    </div>
  );
}
