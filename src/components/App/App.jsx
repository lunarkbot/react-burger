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
import {useDispatch, useSelector} from 'react-redux';
import {authUser} from '../../services/usersSlice';
import {ProtectedRoute} from '../ProtectedRoute/ProtectedRoute';

function App() {
  const dispatch = useDispatch();

  //const { isAuth, isPendingAuth } = useSelector(state => state.users.user)

  //console.log(`auth: ${isAuth}, pending: ${isPendingAuth}`)

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
        <ProtectedRoute path='/profile' exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders' exact={true}>
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute path='/profile/orders/:orderNumber'>
          <OrderDetailsPage />
        </ProtectedRoute>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
