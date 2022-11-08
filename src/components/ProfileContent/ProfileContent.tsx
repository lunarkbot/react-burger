import React, {FC} from 'react';
import styles from './ProfileContent.module.css';
import {NavLink, useRouteMatch} from 'react-router-dom';
import {signOut} from '../../services/usersSlice';
import {useAppDispatch} from '../../hooks';

interface IProfileContentProps {
  className?: string;
}

const ProfileContent: FC<IProfileContentProps> = ({children, className}) => {
  const dispatch = useAppDispatch();
  const routeMatch = useRouteMatch('/profile/orders');

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
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          {routeMatch
            ? 'В этом разделе вы можете просмотреть свою историю заказов'
            : 'В этом разделе вы можете изменить свои персональные данные'
          }
        </p>
      </aside>
      <div className={className}>
        {children}
      </div>
    </main>
  );
}

export default ProfileContent;
