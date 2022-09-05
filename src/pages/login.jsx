import React from 'react';
import indexStyles from './index.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { useInputValue } from '../hooks/useInputValue';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import {useCheckInputs} from '../hooks/useCheckInputs';
import {resetFormInput, signIn} from '../services/usersSlice';

export function LoginPage() {
  const { email, password } = useSelector(state => state.users.form);
  const inputsError = useSelector(state => state.errors);

  const dispatch = useDispatch();
  const setInputValue = useInputValue();
  const checkInputs = useCheckInputs();

  const handleChange = (e) => {
    setInputValue(e);
    checkInputs({[e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputs = {
      email,
      password
    }

    const hasError = checkInputs(inputs);
    if (!hasError) {
      dispatch(signIn(inputs));
      dispatch(resetFormInput());
    }
  }

  return (
    <main className={indexStyles.main}>
      <div className={indexStyles.form}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <form onSubmit={handleSubmit} className={indexStyles.form}>
          <div className={`mb-6 ${indexStyles.inputWrap}`}>
            <Input
              type="text"
              placeholder="E-Mail"
              onChange={handleChange}
              value={email}
              name="email"
              error={inputsError.email.isShow}
              errorText={inputsError.email.text}
              size="default"
            />
          </div>
          <div className={`mb-6 ${indexStyles.inputWrap}`}>
            <PasswordInput
              placeholder="Пароль"
              value={password}
              onChange={handleChange}
              error={inputsError.password.isShow}
              errorText={inputsError.password.text}
            />
          </div>

          <div className="mb-20">
            <Button type="primary" size="medium">
              Войти
            </Button>
          </div>
        </form>

        <p className="text text_type_main-default text_color_inactive mb-4">
          Вы &mdash; новый пользователь?
          <Link to="/register" className={indexStyles.secondButton}>
            <Button type="secondary" size="">
              Зарегистрироваться
            </Button>
          </Link>
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link to="/forgot-password" className={indexStyles.secondButton}>
            <Button type="secondary" size="">
              Восстановить пароль
            </Button>
          </Link>
        </p>
      </div>
    </main>
  );
}
