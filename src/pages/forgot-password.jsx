import React from 'react';
import indexStyles from './index.module.css';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useInputValue} from '../hooks/useInputValue';

export function ForgotPasswordPage() {
  const { email } = useSelector(state => state.users.form);
  const handleChange = useInputValue();

  return (
    <main className={indexStyles.main}>
      <div className={indexStyles.form}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
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

        <div className="mb-20">
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </div>

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
