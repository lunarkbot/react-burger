import React from 'react';
// @ts-ignore
import {Link, NavLink} from 'react-router-dom';
import styles from './AppHeader.module.css';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
  return (
    <header className={`${styles.header} mb-10`}>
      <div className={styles.container}>
        <nav>
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <NavLink
                to="/"
                exact={true}
                activeClassName={styles.activeLink}
                className={`text text_type_main-default ${styles.link}`}
              >
                <BurgerIcon type="primary" />
                Конструктор
              </NavLink>
            </li>
            <li className={styles.listItem}>
              <NavLink
                to="/feed"
                activeClassName={styles.activeLink}
                className={`text text_type_main-default ${styles.link}`}
              >
                <ListIcon type="primary" />
                Лента заказов
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className={styles.logo}>
          <Link to={'/'}><Logo /></Link>
        </div>
        <div className={styles.loginColumn}>
          <button className={styles.login}>
            <NavLink
              to="/profile"
              activeClassName={styles.activeLink}
              className={`text text_type_main-default ${styles.link}`}
            >
              <ProfileIcon type="primary" />
              Личный кабинет
            </NavLink>
          </button>
        </div>
      </div>
    </header>
  );
}
