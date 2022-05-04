import React from 'react';
import axios from 'axios';

export default function AddIncome() {
  /*
  const [type, setType] = useState("Wydatek");
  const [billingDate, setBillingDate] = useState("2022-06-01");
  const [endBillingDate, setEndBillingDate] = useState("2022-08-13");
  const [repeatInterval, setRepeatInterval] = useState(31);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [accountName, setAccountName] = useState('mBank');
  */

  const type = 'Wydatek';
  const billingDate = '2022-06-01';
  const endBillingDate = '2022-08-07';
  const repeatInterval = 31;
  const amount = 20;
  const description = 'hello there description';
  const recipient = 'Sklep';
  const accountName = 'mBank';

  function submit() {
    /*
    axios
      .post('http://localhost:8080/incomes-expenses', {
        billingDate: billingDate,
        endBillingDate: endBillingDate,
        repeatInterval: repeatInterval,
        amount: amount,
        description: description,
        recipient: recipient,
        accountName: accountName,
        type: type
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log('submitteed xd');
    */
    axios.post(
      `http://localhost:8080/incomes-expenses?billingDate=${billingDate}&endBillingDate=${endBillingDate}&repeatInterval=${repeatInterval}&amount=${amount}&description=${description}&type=${type}&recipient=${recipient}&accountName=${accountName}`
    );
    console.log('submitted xd');
    /*const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch(
      `http://localhost:8080/incomes-expenses?billingDate=${billingDate}&endBillingDate=${endBillingDate}&repeatInterval=${repeatInterval}&amount=${amount}&description=${description}&type=${type}&recipient=${recipient}&accountName=${accountName}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => this.setState({ postId: data.id }));
    //.then((res) => res.json());*/
  }

  /*function handleSubmit() {
    const reactData = [{ id: 1, name:' Tom'}, { id: 2, name:' Sarah'}];
    const url = localhost:4000/api/users/register;

    let sendData = () => {
      axios.post(url, reactData)
      .then(res => console.log('Data send'))
      .catch(err => console.log(err.data))
    }
    submit();
  }
*/
  return (
    <div /*>
      <form onSubmit={handleSubmit()}>
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
        <input type="submit" value="Submit" />
        <button>Reset</button>
      </form*/
    >
      <button onClick={submit}>submit</button>
    </div>
  );
}
