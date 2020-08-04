import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CryptoTable from './pages/CryptoTable';
import './styles/app.css';

function App() {
  return (
    <div>
      <header>
        <h1 className="header-title">CryptoTable</h1>
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
