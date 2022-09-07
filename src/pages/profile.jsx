import React, {useState} from 'react';
import indexStyles from './index.module.css';
import styles from './profile.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDispatch, useSelector} from 'react-redux';
import ProfileContent from '../components/ProfileContent/ProfileContent';
import EditableInput from '../components/EditableInput/EditableInput';
import {resetError} from '../services/errorsSlice';
import {updateUser} from '../services/usersSlice';
import Spinner from '../components/Spinner/Spinner';

export function ProfilePage() {
  const { user, profile, isSubmitDisabled} = useSelector(state => state.users);
  const inputErrors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  const [isDisabledInput, setIsDisabledInput] = useState({
    name: true,
    email: true,
  })

  const isSaveEnable = !isDisabledInput.email || !isDisabledInput.name || !isDisabledInput.password;
  const isSaveVisible = user.name !== profile.name
                        || user.email !== profile.email;

  const handleIconClick = (name) => {
    setIsDisabledInput({
      ...isDisabledInput,
      [name]: !isDisabledInput[name]
    })
    dispatch(resetError(name));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};

    for (let name in isDisabledInput) {
      if (!isDisabledInput[name] && profile[name] !== user[name]) {
        data[name] = profile[name];
      }
    }

    dispatch(updateUser({
      dispatch,
      data
    }))

    setIsDisabledInput({
      name: true,
      email: true,
    })
  }

  return (
    <ProfileContent>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={`mb-6 ${indexStyles.inputWrap}`}>
          <EditableInput
             placeholder="Имя"
             name="name"
             onIconClick={handleIconClick}
             disabled={isDisabledInput.name}
             error={inputErrors.name.isShow}
             errorText={inputErrors.name.text}
          />
        </div>
        <div className={`mb-6 ${indexStyles.inputWrap}`}>
          <EditableInput
            placeholder="Логин"
            name="email"
            onIconClick={handleIconClick}
            disabled={isDisabledInput.email}
            error={inputErrors.email.isShow}
            errorText={inputErrors.email.text}
          />
        </div>
        <div className={`mb-6 ${indexStyles.inputWrap}`}>
          <EditableInput
            type="password"
            placeholder="Пароль"
            name="password"
            disabled={true}
            onIconClick={handleIconClick}
          />
        </div>
        {(isSaveEnable
          && <div className={`${styles.submit} ${isSaveVisible ? styles.submitVisible : ''}`}>
                <Button
                  type={'primary'}
                  disabled={isSubmitDisabled}
                >Сохранить {isSubmitDisabled && <Spinner />}</Button>
             </div>)}
      </form>
    </ProfileContent>
  );
}
