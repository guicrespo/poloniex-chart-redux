import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CryptoTable from './pages/CryptoTable';

function App() {
  return (
    <div>
      <header>
        <h1>CryptoTable</h1>
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
