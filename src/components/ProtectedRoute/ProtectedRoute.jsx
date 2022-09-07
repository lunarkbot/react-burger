import {Redirect, Route} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authUser} from '../../services/usersSlice';

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();
  const { isAuth, isPendingAuth } = useSelector(state => state.users.user);

  const init = () => {
    dispatch(authUser());
  }

  useEffect(() => {
    init();
  }, []);

  if (isPendingAuth) return null;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ?
        (
        children
      ) : <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
      }
    />
  );
}
