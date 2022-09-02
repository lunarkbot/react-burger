import React, {useState} from 'react';
import styles from './login.module.css';
import {Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import {updateInput} from '../services/usersSlice';

export function LoginPage() {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const { email, password } = useSelector(state => state.users.form);

  console.log(email)

  const handleChange = (e) => {
    dispatch(updateInput({
      name: e.target.name,
      value: e.target.value
    }))
  }

  return (
    <main className={styles.main}>
      <div className={styles.form}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <div className="mb-6">
          <Input
            type={'text'}
            placeholder={'E-Mail'}
            onChange={handleChange}
            value={email}
            name={'email'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>
        <div className="mb-6">
          <Input
            type={isPasswordShow ? 'text' : 'password'}
            placeholder={'Пароль'}
            onChange={handleChange}
            value={password}
            name={'password'}
            error={false}
            icon={isPasswordShow ? 'HideIcon' : 'ShowIcon'}
            onIconClick={() => setIsPasswordShow(!isPasswordShow)}
            errorText={'Ошибка'}
            size={'default'}
          />
        </div>

        <div className="mb-20">
          <Button type="primary" size="medium">
            Войти
          </Button>
        </div>

        <div className="text text_type_main-default text_color_inactive mb-4">
          Вы &mdash; новый пользователь?
          <div className={styles.secondButton}>
            <Button type="secondary" size="">
              Зарегистрироваться
            </Button>
          </div>
        </div>
        <div className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <div className={styles.secondButton}>
            <Button type="secondary" size="">
              Восстановить пароль
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
