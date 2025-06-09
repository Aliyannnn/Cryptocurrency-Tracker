import React from 'react';
import { useNavigate } from 'react-router';
import { CryptoState } from '../CryptoContext';
import '../Components/Header.css'; 

const Header = () => {
  const navigate = useNavigate();
  const { currency, setCurrency } = CryptoState();

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo" onClick={() => navigate('/')}>
          Crypto Tracker
        </h1>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="currency-selector"
        >
          <option value="USD">USD</option>
          <option value="PKR">PKR</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
