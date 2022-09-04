import React, {useState} from 'react';
import styles from './profile.module.css';
import indexStyles from './index.module.css';
import {NavLink} from 'react-router-dom';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from 'react-redux';
import {useInputValue} from '../hooks/useInputValue';

export function ProfilePage() {
  const { name, email, password } = useSelector(state => state.users.user);
  const handleChange = useInputValue('profile');

  const [isDisabledInput, setIsDisabledInput] = useState({
    name: true,
    email: true,
    password: true
  })

  const handleIconClick = (name) => {
    setIsDisabledInput({
      ...isDisabledInput,
      [name]: !isDisabledInput[name]
    })
  }

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
        <div className={`mb-6 ${indexStyles.inputWrap}`}>
          <Input
            type="text"
            placeholder="Имя"
            disabled={isDisabledInput.name}
            onChange={handleChange}
            value={name}
            name="name"
            error={false}
            icon={'EditIcon'}
            onIconClick={() => handleIconClick('name')}
            errorText="Ошибка"
            size="default"
          />
        </div>
        <div className={`mb-6 ${indexStyles.inputWrap}`}>
          <Input
            type="text"
            placeholder="Логин"
            disabled={isDisabledInput.email}
            onChange={handleChange}
            value={email}
            name="email"
            error={false}
            icon={'EditIcon'}
            onIconClick={() => handleIconClick('email')}
            errorText="Ошибка"
            size="default"
          />
        </div>
        <div className={`mb-6 ${indexStyles.inputWrap}`}>
          <Input
            type="password"
            placeholder="Пароль"
            disabled={isDisabledInput.password}
            onChange={handleChange}
            value={password}
            name="password"
            error={false}
            icon={'EditIcon'}
            onIconClick={() => handleIconClick('password')}
            errorText="Ошибка"
            size="default"
          />
        </div>
      </div>
    </main>
  );
}
