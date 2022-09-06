import React, {useEffect} from 'react';
import AppHeader from '../AppHeader/AppHeader';
import {
  ForgotPasswordPage,
  LoginPage,
  MainPage,
  NotFound404,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  OrdersPage,
  OrderDetailsPage
} from '../../pages';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {authUser} from '../../services/usersSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authUser(dispatch));
  }, [dispatch, authUser])


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
        <Route path='/profile' exact={true}>
          <ProfilePage />
        </Route>
        <Route path='/profile/orders' exact={true}>
          <OrdersPage />
        </Route>
        <Route path='/profile/orders/:orderNumber'>
          <OrderDetailsPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
