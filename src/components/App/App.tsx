import React, {FC, useEffect} from 'react';
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
  OrderDetailsPage,
  FeedPage,
} from '../../pages';
import {BrowserRouter, Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {authUser} from '../../services/usersSlice';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import {getIngredients, resetIngredientDetails} from '../../services/ingredientsSlice';
import {useAppDispatch} from '../../hooks';

const App: FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(authUser(dispatch));
  }, [dispatch, authUser])

  const ModalSwitch = () => {
    const location = useLocation<Location>();
    const history = useHistory();
    let background = location.state && (location.state as any).background;

    useEffect(() => {
      dispatch(getIngredients())
    },[dispatch])

    const handleModalClose = () => {
      dispatch(resetIngredientDetails());
      history.goBack();
    }

    return (
      <>
        <AppHeader />
        <Switch location={background || location}>
          <Route exact={true} path='/'>
            <MainPage />
          </Route>
          <Route path='/ingredients/:ingredientId' exact>
            <IngredientDetails isModal={false} />
          </Route>
          <Route path='/feed' exact>
            <FeedPage />
          </Route>
          <Route path='/feed/:id' exact>
            <OrderDetailsPage isModal={false} />
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
          <ProtectedRoute path='/profile/orders/:id'>
            <OrderDetailsPage isModal={false} />
          </ProtectedRoute>
          <Route>
            <NotFound404 />
          </Route>
        </Switch>

        {background && (
          <>
            <Route
            path='/ingredients/:ingredientId'
            children={
              <Modal type="ingredient" onClose={handleModalClose}>
                <IngredientDetails isModal={true} />
              </Modal>
            }
          />
            <Route
            path='/feed/:id'
            children={
            <Modal type="order" onClose={handleModalClose}>
              <OrderDetailsPage isModal={true} />
            </Modal>
          }
            />
            <Route
              path='/profile/orders/:id'
              children={
                <Modal type="order" onClose={handleModalClose}>
                  <OrderDetailsPage isModal={true} />
                </Modal>
              }
            />
          </>
        )}
      </>
    )
  }

  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
}

export default App;
