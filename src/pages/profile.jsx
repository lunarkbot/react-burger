import React, {useState} from 'react';
import indexStyles from './index.module.css';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from 'react-redux';
import {useInputValue} from '../hooks/useInputValue';
import ProfileContent from '../components/ProfileContent/ProfileContent';

export function ProfilePage() {
  const { name, email, password } = useSelector(state => state.users.user);
  const handleChange = useInputValue('profile');

  const [isDisabledInput, setIsDisabledInput] = useState({
    name: true,
    email: true,
    password: true
  })

  const handleIconClick = (name) => {
    setIsDisabledInput({
      ...isDisabledInput,
      [name]: !isDisabledInput[name]
    })
  }

  return (
    <ProfileContent>
      <div className={`mb-6 ${indexStyles.inputWrap}`}>
        <Input
          type="text"
          placeholder="Имя"
          disabled={isDisabledInput.name}
          onChange={handleChange}
          value={name}
          name="name"
          error={false}
          icon={'EditIcon'}
          onIconClick={() => handleIconClick('name')}
          errorText="Ошибка"
          size="default"
        />
      </div>
      <div className={`mb-6 ${indexStyles.inputWrap}`}>
        <Input
          type="text"
          placeholder="Логин"
          disabled={isDisabledInput.email}
          onChange={handleChange}
          value={email}
          name="email"
          error={false}
          icon={'EditIcon'}
          onIconClick={() => handleIconClick('email')}
          errorText="Ошибка"
          size="default"
        />
      </div>
      <div className={`mb-6 ${indexStyles.inputWrap}`}>
        <Input
          type="password"
          placeholder="Пароль"
          disabled={isDisabledInput.password}
          onChange={handleChange}
          value={password}
          name="password"
          error={false}
          icon={'EditIcon'}
          onIconClick={() => handleIconClick('password')}
          errorText="Ошибка"
          size="default"
        />
      </div>
    </ProfileContent>
  );
}
