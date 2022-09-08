import React, {useEffect} from 'react';
import indexStyles from './index.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useInputValue} from '../hooks/useInputValue';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useHistory } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import {useCheckInputs} from '../hooks/useCheckInputs';
import {resetPassword, resetPasswordData} from '../services/passwordSlice';
import {resetFormInput} from '../services/usersSlice';
import Spinner from '../components/Spinner/Spinner';
import BigSpinner from '../components/BigSpinner/BigSpinner';

export function ResetPasswordPage() {
  const { token, password } = useSelector(state => state.users.form);
  const { isAuth, isPendingAuth } = useSelector(state => state.users.user);
  const inputsError = useSelector(state => state.errors);
  const {
    isPasswordReset,
    isButtonDisabled,
    isResetEmailSend
  } = useSelector(state => state.password);
  const dispatch = useDispatch();
  const setInputValue = useInputValue();
  const checkInputs = useCheckInputs();
  const history = useHistory();

  useEffect(() => {
    if (isPasswordReset) {
      dispatch(resetPasswordData());
      dispatch(resetFormInput());
      history.push('/login');
    }
  }, [isPasswordReset, history, dispatch])

  const handleChange = (e) => {
    setInputValue(e);
    checkInputs({[e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = {
      token,
      password,
    }

    const hasError = checkInputs(inputs);
    if (!hasError) {
      dispatch(resetPassword(inputs));
    }
  }

  if (isPendingAuth) return <BigSpinner />;

  if (isAuth) {
    return (
      <Redirect to='/' />
    )
  }

  if (!isResetEmailSend) {
    return (
      <Redirect to='/forgot-password' />
    )
  }


  return (
    <main className={indexStyles.main}>
      <div className={indexStyles.form}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <form onSubmit={handleSubmit} className={indexStyles.form}>
          <div className={`mb-6 ${indexStyles.inputWrap}`}>
            <PasswordInput
              placeholder="Введите новый пароль"
              value={password}
              onChange={handleChange}
              error={inputsError.password.isShow}
              errorText={inputsError.password.text}
            />
          </div>
          <div className={`mb-6 ${indexStyles.inputWrap}`}>
            <Input
              type="text"
              placeholder="Введите код из письма"
              onChange={handleChange}
              value={token}
              name="token"
              error={inputsError.token.isShow}
              errorText={inputsError.token.text}
              size="default"
            />
          </div>

          <div className="mb-20">
            <Button type="primary" disabled={isButtonDisabled} size="medium">
              Сохранить {isButtonDisabled && <Spinner />}
            </Button>
          </div>
        </form>

        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?
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
