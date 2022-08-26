import React from 'react';
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
              <BurgerIcon type="primary" />
              <span className="text text_type_main-default ml-2">Конструктор</span>
            </li>
            <li className={styles.listItem}>
              <ListIcon type="secondary"/>
              <span className="text text_type_main-default text_color_inactive ml-2">Лента заказов</span>
            </li>
          </ul>
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>
        <div className={styles.loginColumn}>
          <button className={styles.login}>
            <ProfileIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive ml-2">Личный кабинет</span>
          </button>
        </div>
      </div>
    </header>
  );
}
