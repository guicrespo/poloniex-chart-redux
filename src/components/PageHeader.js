import React, { Component } from 'react';
import coinIcon from '../images/coin_icon.png';

class PageHeader extends Component {
  render() {
    return (
      <header className="header">
        <img src={coinIcon} className="coin-icon" alt="ícone com três moedas sem preenchimento empilhadas" />
        <a href="/" className="header-link">
          <h1 className="header-title">
            Crypto
            <span style={{ color: '#004AA0' }}>Table</span>
          </h1>
        </a>
      </header>
    );
  }
}

export default PageHeader;
