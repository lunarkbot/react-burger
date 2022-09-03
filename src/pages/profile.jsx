import React from 'react';
import styles from './profile.module.css';
import {NavLink} from 'react-router-dom';

export function ProfilePage() {
  return (
    <main className={styles.main}>
      <aside>
        <nav className="mb-20">
          <ul className={styles.list}>
            <li>
              <NavLink
                to="/profile"
                className={`text text_type_main-medium ${styles.link}`}
                activeClassName={styles.activeLink}
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={`text text_type_main-medium ${styles.link}`}
                activeClassName={styles.activeLink}
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
                className={`text text_type_main-medium ${styles.link}`}
                activeClassName={styles.activeLink}
              >
                Выход
              </NavLink>
            </li>
          </ul>
        </nav>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете
          изменить свои персональные данные
        </p>
      </aside>
      <div>
        
      </div>
    </main>
  );
}
