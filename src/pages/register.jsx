import React, {useState} from 'react';
import styles from './register.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {useInputValue} from '../hooks/useInputValue';

export function RegisterPage() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const { email, password, name } = useSelector(state => state.users.form);

  const handleChange = useInputValue();

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <div className="mb-6">
          <Input
            type={isPasswordShow ? 'text' : 'password'}
            placeholder="Имя"
            onChange={handleChange}
            value={name}
            name="name"
            error={false}
            icon={isPasswordShow ? 'HideIcon' : 'ShowIcon'}
            onIconClick={() => setIsPasswordShow(!isPasswordShow)}
            errorText="Ошибка"
            size="default"
          />
        </div>
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
            Зарегистрироваться
          </Button>
        </div>

        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?
          <Link to="/login" className={styles.secondButton}>
            <Button type="secondary" size="">
              войти
            </Button>
          </Link>
        </p>
      </div>
    </main>
  );
}
