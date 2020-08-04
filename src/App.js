import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CryptoTable from './pages/CryptoTable';
import PageHeader from './components/PageHeader';
import './styles/app.css';

function App() {
  return (
    <div>
      <PageHeader />
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={CryptoTable} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
