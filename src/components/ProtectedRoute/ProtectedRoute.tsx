import {Redirect, Route} from 'react-router-dom';
import {FC, useEffect} from 'react';
import {authUser} from '../../services/usersSlice';
import {useAppDispatch, useAppSelector} from '../../hooks';

type ProtectedRoute = {
  [key: string]: any;
}

const ProtectedRoute: FC<ProtectedRoute> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();
  const { isAuth, isPendingAuth } = useAppSelector(state => state.users.user);

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

export default ProtectedRoute;
