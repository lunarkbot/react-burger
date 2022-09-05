import React from 'react';
import indexStyles from './index.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {useInputValue} from '../hooks/useInputValue';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import {signUp} from '../services/usersSlice';

export function RegisterPage() {
  const { email, password, name } = useSelector(state => state.users.form);
  const dispatch = useDispatch();

  const handleChange = useInputValue();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp({
      email,
      password,
      name
    }));
  }

  return (
    <main className={indexStyles.main}>
      <div className={indexStyles.formWrap}>
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <form onSubmit={handleSubmit} className={indexStyles.form}>
          <div className={`mb-6 ${indexStyles.inputWrap}`}>
            <Input
              type="text"
              placeholder="Имя"
              onChange={handleChange}
              value={name}
              name="name"
              error={false}
              errorText="Ошибка"
              size="default"
            />
          </div>
          <div className={`mb-6 ${indexStyles.inputWrap}`}>
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
          <div className={`mb-6 ${indexStyles.inputWrap}`}>
            <PasswordInput
              placeholder="Пароль"
              value={password}
              onChange={handleChange}
              error={false}
              errorText="Ошибка"
            />
          </div>

          <div className="mb-20">
            <Button type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </div>
        </form>

        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?
          <Link to="/login" className={indexStyles.secondButton}>
            <Button type="secondary" size="">
              Войти
            </Button>
          </Link>
        </p>
      </div>
    </main>
  );
}
