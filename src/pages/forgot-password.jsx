import React, {useEffect} from 'react';
import indexStyles from './index.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {useInputValue} from '../hooks/useInputValue';
import {useCheckInputs} from '../hooks/useCheckInputs';
import {forgotPassword, resetPasswordData} from '../services/passwordSlice';
import {resetFormInput} from '../services/usersSlice';
import Spinner from '../components/Spinner/Spinner';

export function ForgotPasswordPage() {
  const { email } = useSelector(state => state.users.form);
  const inputsError = useSelector(state => state.errors);
  const { isResetEmailSend, isButtonDisabled } = useSelector(state => state.password);
  const history = useHistory();
  const dispatch = useDispatch();
  const setInputValue = useInputValue();
  const checkInputs = useCheckInputs();

  useEffect(() => {
    if (isResetEmailSend) {
      dispatch(resetPasswordData());
      dispatch(resetFormInput());
      history.push('/reset-password');
    }
  }, [isResetEmailSend, history, dispatch])

  const handleChange = (e) => {
    setInputValue(e);
    checkInputs({[e.target.name]: e.target.value});
  };

  async function handleSubmit (e) {
    e.preventDefault();
    const inputs = {
      email,
    }

    const hasError = checkInputs(inputs);

    if (!hasError) {
      dispatch(forgotPassword(inputs));
    }
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
            <Button type="secondary" size="">
              Войти
            </Button>
          </Link>
        </p>
      </div>
    </main>
  );
}
