import React from 'react';
import coinIcon from '../images/coin_icon.png';

const PageHeader = () => (
  <header className="header">
    <img
      src={coinIcon}
      className="coin-icon"
      alt="ícone com três moedas sem preenchimento empilhadas"
    />
    <a href="/poloniex-chart-redux" className="header-link">
      <h1 className="header-title">
        Crypto
        <span style={{ color: '#004AA0' }}>INFO</span>
      </h1>
    </a>
  </header>
);

export default PageHeader;
