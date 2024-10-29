import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BankTransfer() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('');
  const [transactionReference, setTransactionReference] = useState('');

  useEffect(() => {
    // Fetch the list of banks from the microservice
    axios.get('http://192.168.1.22:8085/api/banks') 
      .then(response => {
        setBanks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the banks!', error);
      });
  }, []);

  const handleBankSelect = (bankId) => {
    // Send the selected bank ID and other parameters to the microservice
    axios.post(`http://192.168.1.22:8085/api/banks/select`, null, {
      params: {
        bankId: bankId,
        amount: amount,
        currency: currency,
        transactionReference: transactionReference
      }
    })
    .then(response => {
      setSelectedBank(response.data);
      console.log('Bank selected:', response.data);
    })
    .catch(error => {
      console.error('There was an error selecting the bank!', error);
    });
  };

  return (
    <div>
      <h2>Select Bank for Transfer</h2>

      <div>
        <label>Amount: </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Currency: </label>
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Transaction Reference: </label>
        <input
          type="text"
          value={transactionReference}
          onChange={(e) => setTransactionReference(e.target.value)}
          required
        />
      </div>

      <h3>Available Banks</h3>
      <ul>
        {banks.map(bank => (
          <li key={bank.id}>
            {bank.name} - {bank.websiteUrl}
            <button onClick={() => handleBankSelect(bank.id)}>
              Select Bank
            </button>
          </li>
        ))}
      </ul>

      {selectedBank && (
        <div>
          <h3>Bank Selected: {selectedBank.name}</h3>
          <p>Website: <a href={selectedBank.websiteUrl}>{selectedBank.websiteUrl}</a></p>
          <p>App URL: {selectedBank.appUrl}</p>
        </div>
      )}
    </div>
  );
}

export default BankTransfer;
