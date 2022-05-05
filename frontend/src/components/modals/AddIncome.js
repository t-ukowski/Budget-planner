import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AddIncome() {
  const [type, setType] = useState('Wydatek');
  const [billingDate, setBillingDate] = useState('2022-06-01');
  const [endBillingDate, setEndBillingDate] = useState('2022-08-13');
  const [repeatInterval, setRepeatInterval] = useState(31);
  const [amount, setAmount] = useState(20);
  const [description, setDescription] = useState('default description');
  const [recipient, setRecipient] = useState('Company');
  const [accountName, setAccountName] = useState('mBank');

  const types = [{ label: 'Wydatek' }, { label: 'Przychód' }];
  const accounts = ['ING', 'mBank'];

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
          setType(newType.label);
        }}
        sx={{ width: 300 }}
        options={types}
        autoHighlight
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            {option.label}
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

      <br />
      <label>Nazwa</label>
      <br />
      <input
        name="description"
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <br />

      <br />
      <label>Kwota</label>
      <br />
      <input name="amount" type="text" onChange={(e) => setAmount(e.target.value)} value={amount} />
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
      <label>Odbiorca</label>
      <br />
      <input
        name="recipient"
        type="text"
        onChange={(e) => setRecipient(e.target.value)}
        value={recipient}
      />
      <br />

      <Autocomplete
        name="account"
        id="select-account"
        value={accountName}
        onChange={(event, newAccount) => {
          setAccountName(newAccount);
        }}
        sx={{ width: 300 }}
        options={accounts}
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
