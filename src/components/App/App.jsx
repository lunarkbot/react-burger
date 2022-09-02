import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import {LoginPage, MainPage, NotFound404} from '../../pages';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Switch>
        <Route exact={true} path='/'>
          <MainPage />
        </Route>
        <Route path='/login'>
          <LoginPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
