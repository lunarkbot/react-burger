import React, {ChangeEvent, FC, SyntheticEvent, useRef} from 'react';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {useInputValue} from '../../hooks/useInputValue';
import {useCheckInputs} from '../../hooks/useCheckInputs';
import {useAppSelector} from '../../hooks';

interface IEditableInputProps {
  placeholder: string;
  errorText?: string;
  error?: boolean;
  type?: 'text' | 'password';
  onIconClick: Function;
  disabled: boolean;
  name: string;
}

type TInputValue = {
  inputValue: string;
  inputDefaultValue: string;
  [key: string]: string | undefined;
}

const EditableInput: FC<IEditableInputProps> = (
    {
      placeholder,
      errorText = '',
      error = false,
      type = 'text',
      onIconClick,
      disabled,
      name
    }
  ) => {

  const {inputValue, inputDefaultValue}: TInputValue = useAppSelector(state => ({
    // @ts-ignore
    inputValue: state.users.profile[name],
    // @ts-ignore
    inputDefaultValue: state.users.user[name],
  }));
  const updateInputValue = useInputValue('profile');
  const inputRef = useRef<HTMLInputElement>(null);
  const checkInputs = useCheckInputs();

  const handleIconClick = () => {
    // восстанавливаем значения по умолчанию, если пользователь
    // передумал их сохранять и отменил редактирование
    if (!disabled) {
      updateInputValue({
        isElement: true,
        element: inputRef.current,
        value: inputDefaultValue
      });
    } else {
      setTimeout(() => {
        inputRef?.current?.focus();
      }, 0);
    }

    onIconClick(name);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateInputValue(e);
    checkInputs({[name]: e.target.value});
  }

  return (
    <Input
      ref={inputRef}
      type={type}
      placeholder={placeholder}
      onChange={handleChange}
      value={type === 'password' ? 'password' : inputValue}
      name={name}
      disabled={disabled}
      error={type === 'password' ? false : error}
      icon={disabled ? 'EditIcon' : 'CloseIcon'}
      onIconClick={type === 'password' ? () => console.log('Это поле просто заглушка ¯\\_(ツ)_/¯') : handleIconClick}
      errorText={type === 'password' ? '' : errorText}
      size="default"
    />
  );
}

export default EditableInput;
