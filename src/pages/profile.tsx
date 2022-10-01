import React, {useState} from 'react';
import indexStyles from './index.module.css';
import styles from './profile.module.css';
import {Button} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileContent from '../components/ProfileContent/ProfileContent';
import EditableInput from '../components/EditableInput/EditableInput';
import {resetError} from '../services/errorsSlice';
import {updateUser} from '../services/usersSlice';
import Spinner from '../components/Spinner/Spinner';
import {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../hooks';
import {useDispatch} from 'react-redux';

interface IIsDisabledInput {
  [name: string]: boolean;
}

interface IUserData {
  profile: {
    [key: string]: string;
  };
  user: {
    [key: string]: string | boolean;
  };
  isSubmitDisabled: boolean;
}

export const ProfilePage: FC = () => {
  const { user, profile, isSubmitDisabled}: IUserData = useAppSelector(state => state.users);
  const inputErrors = useAppSelector(state => state.errors);
  const dispatch = useAppDispatch();

  const [isDisabledInput, setIsDisabledInput] = useState<IIsDisabledInput>({
    name: true,
    email: true,
  })

  const isSaveEnable = !isDisabledInput.email || !isDisabledInput.name || !isDisabledInput.password;
  const isSaveVisible = user.name !== profile.name
                        || user.email !== profile.email;

  const handleIconClick = (name: string) => {
    setIsDisabledInput({
      ...isDisabledInput,
      [name]: !isDisabledInput[name]
    })
    dispatch(resetError(name));
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data: {[key: string]: string} = {};

    for (let name in isDisabledInput) {
      if (!isDisabledInput[name] && profile[name] !== user[name]) {
        data[name] = profile[name];
      }
    }
    // @ts-ignore
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
