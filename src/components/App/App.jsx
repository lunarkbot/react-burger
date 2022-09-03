import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import {
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  NotFound404,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage
} from '../../pages';
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
        <Route path='/register'>
          <RegisterPage />
        </Route>
        <Route path='/forgot-password'>
          <ForgotPasswordPage />
        </Route>
        <Route path='/reset-password'>
          <ResetPasswordPage />
        </Route>
        <Route path='/profile'>
          <ProfilePage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
