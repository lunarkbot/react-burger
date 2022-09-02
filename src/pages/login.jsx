import React, {useState} from 'react';
import styles from './login.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { useInputValue } from '../hooks/useInputValue';

export function LoginPage() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const { email, password } = useSelector(state => state.users.form);

  const handleChange = useInputValue();

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="E-Mail"
            onChange={handleChange}
            value={email}
            name="email"
            error={false}
            errorText="Ошибка"
            size="default"
          />
        </div>
        <div className="mb-6">
          <Input
            type={isPasswordShow ? 'text' : 'password'}
            placeholder="Пароль"
            onChange={handleChange}
            value={password}
            name="password"
            error={false}
            icon={isPasswordShow ? 'HideIcon' : 'ShowIcon'}
            onIconClick={() => setIsPasswordShow(!isPasswordShow)}
            errorText="Ошибка"
            size="default"
          />
        </div>

        <div className="mb-20">
          <Button type="primary" size="medium">
            Войти
          </Button>
        </div>

        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы &mdash; новый пользователь?
          <Link to="/register" className={styles.secondButton}>
            <Button type="secondary" size="">
              Зарегистрироваться
            </Button>
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link to="/forgot-password" className={styles.secondButton}>
            <Button type="secondary" size="">
              Восстановить пароль
            </Button>
          </Link>
        </p>
      </div>
    </main>
  );
}
