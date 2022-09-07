import React, {useEffect} from 'react';
import styles from './ProfileContent.module.css';
import {NavLink, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {resetUserData, signOut} from '../../services/usersSlice';

function ProfileContent({children, className}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuth = useSelector(state => state.users.user.isAuth);

  /*useEffect(() => {
    if (!isAuth) history.push('/login');
  }, [isAuth, history])*/

  const handleLogout = () => {
    dispatch(signOut());
  }

  return (
    <main className={styles.profile}>
      <aside>
        <nav className="mb-20">
          <ul className={styles.profile__list}>
            <li>
              <NavLink
                to="/profile"
                exact={true}
                className={`text text_type_main-medium ${styles.profile__link}`}
                activeClassName={styles.activeLink}
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={`text text_type_main-medium ${styles.profile__link}`}
                activeClassName={styles.activeLink}
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <div
                onClick={handleLogout}
                className={`text text_type_main-medium ${styles.profile__link}`}
              >
                Выход
              </div>
            </li>
          </ul>
        </nav>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </aside>
      <div className={className}>
        {children}
      </div>
    </main>
  );
}

export default ProfileContent;

ProfileContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
}
