import React, {FC, useEffect} from 'react';
import indexStyles from './index.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useHistory} from 'react-router-dom';
import {useInputValue} from '../hooks/useInputValue';
import {useCheckInputs} from '../hooks/useCheckInputs';
import {forgotPassword} from '../services/passwordSlice';
import {resetFormInput} from '../services/usersSlice';
import Spinner from '../components/Spinner/Spinner';
import BigSpinner from '../components/BigSpinner/BigSpinner';
import {useAppDispatch, useAppSelector} from '../hooks';

export const ForgotPasswordPage: FC = () => {
  const { email } = useAppSelector(state => state.users.form);
  const inputsError = useAppSelector(state => state.errors);
  const { isAuth, isPendingAuth } = useAppSelector(state => state.users.user);
  const { isResetEmailSend, isButtonDisabled } = useAppSelector(state => state.password);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const setInputValue = useInputValue();
  const checkInputs = useCheckInputs();

  useEffect(() => {
    if (isResetEmailSend) {
      dispatch(resetFormInput());
      history.push('/reset-password');
    }
  }, [isResetEmailSend, history, dispatch])

  const handleChange = (e: React.ChangeEvent): void => {
    setInputValue(e);
    const target = e.target as HTMLInputElement;
    checkInputs({[target.name]: target.value});
  };

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const inputs = {
      email,
    }

    const hasError = checkInputs(inputs);

    if (!hasError) {
      // @ts-ignore
      dispatch(forgotPassword(inputs));
    }
  }



  if (isPendingAuth) return <BigSpinner />;

  if (isAuth) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <main className={indexStyles.main}>
      <div className={indexStyles.form}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
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

          <div className="mb-20">
            <Button type="primary" disabled={isButtonDisabled} size="medium">
              Восстановить {isButtonDisabled && <Spinner />}
            </Button>
          </div>
        </form>

        <p className="text text_type_main-default text_color_inactive mb-4">
          Вспомнили пароль?
          <Link to="/login" className={indexStyles.secondButton}>
            <Button type="secondary" size="small">
              Войти
            </Button>
          </Link>
        </p>
      </div>
    </main>
  );
}
