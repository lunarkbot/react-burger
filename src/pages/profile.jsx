import React, {useState} from 'react';
import indexStyles from './index.module.css';
import styles from './profile.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector} from 'react-redux';
import ProfileContent from '../components/ProfileContent/ProfileContent';
import EditableInput from '../components/EditableInput/EditableInput';

export function ProfilePage() {
  const { name, email, password } = useSelector(state => state.users.profile);

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
      <form className={styles.form}>
        <div className={`mb-6 ${indexStyles.inputWrap}`}>
          <EditableInput
             placeholder="Имя"
             name="name"
             onIconClick={handleIconClick}
          />
        </div>
        <div className={`mb-6 ${indexStyles.inputWrap}`}>
          <EditableInput
            placeholder="Логин"
            name="email"
            onIconClick={handleIconClick}
          />
        </div>
        <div className={`mb-6 ${indexStyles.inputWrap}`}>
          <EditableInput
            type="password"
            placeholder="Пароль"
            name="password"
            onIconClick={handleIconClick}
          />
        </div>
        {(!isDisabledInput.email || !isDisabledInput.name || !isDisabledInput.password)
          && <Button type={'primary'}>Сохранить</Button>}
      </form>
    </ProfileContent>
  );
}
