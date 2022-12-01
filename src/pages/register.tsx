import React, {ChangeEvent, FC, FormEvent, useEffect} from 'react';
import indexStyles from './index.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom';
import {useInputValue} from '../hooks/useInputValue';
import PasswordInput from '../components/PasswordInput/PasswordInput';
import {resetFormInput, signUp} from '../services/usersSlice';
import {useCheckInputs} from '../hooks/useCheckInputs';
import Spinner from '../components/Spinner/Spinner';
import {resetErrors} from '../services/errorsSlice';
import {useAppDispatch, useAppSelector} from '../hooks';
import {LocationState} from '../types';

export const RegisterPage: FC = () => {
  const { email, password, name } = useAppSelector(state => state.users.form);
  const { isAuth, isPendingAuth } = useAppSelector(state => state.users.user);
  const inputsError = useAppSelector(state => state.errors);
  const { isRegistrationSuccess, isSubmitDisabled } = useAppSelector(state => ({
    isRegistrationSuccess: state.users.registration.isSuccess,
    isSubmitDisabled: state.users.isSubmitDisabled,
  }));
  const history = useHistory();
  const location = useLocation<LocationState>();
  const dispatch = useAppDispatch();
  const setInputValue = useInputValue();
  const checkInputs = useCheckInputs();

  useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

  useEffect(() => {
    if (isRegistrationSuccess) {
      dispatch(resetFormInput());
      history.push('/');
    }
  }, [history, dispatch, isRegistrationSuccess])

  const handleChange = (e: ChangeEvent) => {
    setInputValue(e);
    const target = e.target as HTMLInputElement;
    checkInputs({[target.name]: target.value});
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const inputs = {
      email,
      password,
      name
    }

    const hasError = checkInputs(inputs);

    if (!hasError) dispatch(signUp(inputs));
  }

  if (isAuth) {
    return (
      <Redirect
        to={ location?.state?.from?.pathname || '/' }
      />
    )
  }

  if (isPendingAuth) return null;

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
              error={inputsError.name.isShow}
              errorText={inputsError.name.text}
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
            <Button htmlType="submit" type="primary" disabled={isSubmitDisabled} size="medium">
              Зарегистрироваться {isSubmitDisabled && <Spinner />}
            </Button>
          </div>
        </form>

        <p className="text text_type_main-default text_color_inactive mb-4">
          Уже зарегистрированы?
          <Link to="/login" className={indexStyles.secondButton}>
            <Button htmlType="button" type="secondary" size="small">
              Войти
            </Button>
          </Link>
        </p>
      </div>
    </main>
  );
}
