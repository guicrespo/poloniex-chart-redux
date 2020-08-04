import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CryptoTable from './pages/CryptoTable';
import './styles/app.css';
import coinIcon from './images/coin_icon.png';

function App() {
  return (
    <div>
      <header className="header">
        <img src={coinIcon} className="coin-icon" alt="ícone com três moedas sem preenchimento empilhadas" />
        <h1 className="header-title">
          Crypto
          <span style={{ color: '#004AA0' }}>Table</span>
        </h1>
      </header>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CryptoTable} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
