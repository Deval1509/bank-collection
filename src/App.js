import React, { useEffect, useState } from 'react';
import './App.css';
import BankList from './components/BankList';

function App() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
        const response = await fetch('http://localhost:8085/api/banks'); // Ensure this matches your backend API URL and port
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBanks(data);
    } catch (error) {
        console.error('Error fetching banks:', error);
    }
};


  return (
    <div className="App">
      <h1>Select Your Bank</h1>
      <BankList banks={banks} />
    </div>
  );
}

export default App;
