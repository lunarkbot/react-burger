import React, {useState} from 'react';
import indexStyles from './index.module.css';
import {useSelector} from 'react-redux';
import {useInputValue} from '../hooks/useInputValue';
import {Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';

export function ResetPasswordPage() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const { verificationCode, password } = useSelector(state => state.users.form);

  const handleChange = useInputValue();

  return (
    <main className={indexStyles.main}>
      <div className={indexStyles.form}>
        <p className="text text_type_main-medium mb-6">Восстановление пароля</p>
        <div className={`mb-6 ${indexStyles.inputWrap}`}>
          <Input
            type={isPasswordShow ? 'text' : 'password'}
            placeholder="Введите новый пароль"
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
        <div className={`mb-6 ${indexStyles.inputWrap}`}>
          <Input
            type="text"
            placeholder="Введите код из письма"
            onChange={handleChange}
            value={verificationCode}
            name="verificationCode"
            error={false}
            errorText="Ошибка"
            size="default"
          />
        </div>

        <div className="mb-20">
          <Button type="primary" size="medium">
            Сохранить
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
