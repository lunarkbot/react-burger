import {Redirect, Route, RouteProps} from 'react-router-dom';
import React, {FC, useEffect} from 'react';
import {authUser} from '../../services/usersSlice';
import {useAppDispatch, useAppSelector} from '../../hooks';

type ProtectedRoute = RouteProps & {children?: React.ReactNode}

const ProtectedRoute: FC<ProtectedRoute> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();
  const { isAuth, isPendingAuth } = useAppSelector(state => state.users.user);

  const init = () => {
    dispatch(authUser(dispatch));
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

export default ProtectedRoute;
