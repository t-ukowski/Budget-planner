import React, { useState } from 'react';
import axios from 'axios';

export default function AddIncome() {
  const [type, setType] = useState('Wydatek');
  const [billingDate, setBillingDate] = useState('2022-06-01');
  const [endBillingDate, setEndBillingDate] = useState('2022-08-13');
  const [repeatInterval, setRepeatInterval] = useState(31);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('very funny description');
  const [recipient, setRecipient] = useState('Company');
  const [accountName, setAccountName] = useState('mBank');

  function handleSubmit(event) {
    event.preventDefault();
    axios({
      method: 'post',
      mode: 'same-origin',
      url: 'http://localhost:8080/incomes-expenses',
      withCredentials: false,
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
      <label>Rodzaj</label>
      <br />
      <input name="type" type="text" onChange={(e) => setType(e.target.value)} value={type} />
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
      <label>Amount</label>
      <br />
      <input name="amount" type="text" onChange={(e) => setAmount(e.target.value)} value={amount} />
      <br />

      <label>Billing Date</label>
      <br />
      <input
        name="billingDate"
        type="date"
        onChange={(e) => setBillingDate(e.target.value)}
        value={billingDate}
      />
      <br />
      <label>endBillingDate</label>
      <br />
      <input
        name="endBillingDate"
        type="date"
        onChange={(e) => setEndBillingDate(e.target.value)}
        value={endBillingDate}
      />
      <br />
      <label>repeatInterval</label>
      <br />
      <input
        name="repeatInterval"
        type="text"
        onChange={(e) => setRepeatInterval(e.target.value)}
        value={repeatInterval}
      />
      <br />
      <label>recipient</label>
      <br />
      <input
        name="recipient"
        type="text"
        onChange={(e) => setRecipient(e.target.value)}
        value={recipient}
      />
      <br />
      <label>accountName</label>
      <br />
      <input
        name="accountName"
        type="text"
        onChange={(e) => setAccountName(e.target.value)}
        value={accountName}
      />
      <br />
      <input className="submitButton" type="submit" value="Submit" />
    </form>
  );
}
