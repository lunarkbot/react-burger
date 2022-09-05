import React, {useRef, useState} from 'react';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {useInputValue} from '../../hooks/useInputValue';
import {useSelector} from 'react-redux';

function EditableInput(
    {
      placeholder,
      errorText = '',
      error = false,
      type = 'text',
      onIconClick,
      name
    }
  ) {

  const {inputValue, inputDefaultValue} = useSelector(state => ({
    inputValue: state.users.profile[name],
    inputDefaultValue: state.users.user[name],
  }))
  const [isDisabled, setIsDisabled] = useState(true);
  const updateInputValue = useInputValue('profile');
  const inputRef = useRef();

  const handleIconClick = () => {
    // восстанавливаем значения по умолчанию, если пользователь
    // передумал их сохранять и отменил редактирование
    if (!isDisabled) {
      updateInputValue({
        isElement: true,
        element: inputRef.current,
        value: inputDefaultValue
      });
    }

    setIsDisabled(!isDisabled);
    onIconClick(name);
  }

  return (
    <Input
      ref={inputRef}
      type={type}
      placeholder={placeholder}
      onChange={updateInputValue}
      value={inputValue}
      name={name}
      disabled={isDisabled}
      error={error}
      icon={isDisabled ? 'EditIcon' : 'CloseIcon'}
      onIconClick={handleIconClick}
      errorText={errorText}
      size="default"
    />
  );
}

export default EditableInput;

EditableInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  error: PropTypes.bool,
  type: PropTypes.string,
}