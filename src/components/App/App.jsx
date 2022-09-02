import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import { MainPage } from '../../pages';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Switch>
        <Route exact={true} path='/'>
          <MainPage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
