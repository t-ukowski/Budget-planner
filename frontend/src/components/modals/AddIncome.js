import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AddIncome() {
  const [type, setType] = useState('');
  const [billingDate, setBillingDate] = useState('2022-06-01');
  const [endBillingDate, setEndBillingDate] = useState('2022-08-13');
  const [repeatInterval, setRepeatInterval] = useState(undefined);
  const [amount, setAmount] = useState(20);
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
      />

      <br />
      <TextField
        id="outlined-basic"
        label="Kwota"
        variant="outlined"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />

      <br />
      <label>Data</label>
      <br />
      <input
        name="billingDate"
        type="date"
        onChange={(e) => setBillingDate(e.target.value)}
        value={billingDate}
      />
      <br />
      <label>Data końcowa</label>
      <br />
      <input
        name="endBillingDate"
        type="date"
        onChange={(e) => setEndBillingDate(e.target.value)}
        value={endBillingDate}
      />
      <br />
      <label>Co ile dni powtarzać</label>
      <br />
      <input
        name="repeatInterval"
        type="text"
        onChange={(e) => setRepeatInterval(e.target.value)}
        value={repeatInterval}
      />
      <br />

      <TextField
        id="outlined-basic"
        label="Odbiorca"
        variant="outlined"
        onChange={(e) => setRecipient(e.target.value)}
        value={recipient}
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
            label="Konto"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password' // disable autocomplete and autofill
            }}
          />
        )}
      />
      <br />
      <input className="submitButton" type="submit" value="Submit" />
    </form>
  );
}
