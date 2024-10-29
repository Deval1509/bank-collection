import React from 'react';

function BankList({ banks }) {

  const handleBankClick = (bank) => {
    const appUrl = bank.appUrl;
    const websiteUrl = bank.websiteUrl;

    // Try to open the app using the custom scheme
    window.location.href = appUrl;

    // Fallback to the website if the app does not open
    setTimeout(() => {
      window.location.href = websiteUrl;
    }, 1000); // Wait for 1 second to see if the app opens
  };

  return (
    <div>
      <ul>
        {banks.map((bank) => (
          <li key={bank.id} onClick={() => handleBankClick(bank)}>
            {bank.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BankList;
