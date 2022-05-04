import React from 'react';
import axios from 'axios';

export default function AddIncome() {
  /*
  const [type, setType] = useState("Wydatek");
  const [billingDate, setBillingDate] = useState("2022-06-01");
  const [endBillingDate, setEndBillingDate] = useState("2022-08-13");
  const [repeatInterval, setRepeatInterval] = useState(31);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('very funny description');
  const [recipient, setRecipient] = useState('Company');
  const [accountName, setAccountName] = useState('mBank');
  */

  const type = 'Wydatek';
  const billingDate = '2022-06-01';
  const endBillingDate = '2022-08-07';
  const repeatInterval = 31;
  const amount = 20;
  const description = 'hello there description';
  const recipient = 'Axios with same-origin mode 2';
  const accountName = 'mBank';

  function submit() {
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
    <div>
      Zaplanuj
      <p>
        Rodzaj:
        <select className="form-control" id="dropDownList0" name="type">
          <option value="0">Wybierz...</option>
          <option value="Wydatek">Wydatek</option>
          <option value="Przychód">Przychód</option>
        </select>
      </p>
      <p>
        Nazwa: <input type="text" id="description" name="description" value="" />
      </p>
      <p>
        Kwota: <input type="text" id="amount" name="amount" value="0.0" />
      </p>
      <p>
        Data wydatku: <input type="text" id="billingDate" name="billingDate" value="" />
      </p>
      <p>
        Data końcowa: <input type="text" id="endBillingDate" name="endBillingDate" value="" />
      </p>
      <p>
        Co ile dni powtarzać:{' '}
        <input type="text" id="repeatInterval" name="repeatInterval" value="0" />
      </p>
      <p>
        Odbiorca: <input type="text" id="recipient" name="recipient" value="brak" />
      </p>
      <p>
        Konto:
        <select className="form-control" id="dropDownList" name="accountName">
          <option value="0">Wybierz...</option>
          <option value="ING">ING</option>
          <option value="Mbank">Mbank</option>
        </select>
      </p>
      <button onClick={submit}>submit</button>
    </div>
  );
}
