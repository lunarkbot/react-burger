import React, {useRef} from 'react';
import {Input} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {useInputValue} from '../../hooks/useInputValue';
import {useSelector} from 'react-redux';
import {useCheckInputs} from '../../hooks/useCheckInputs';

function EditableInput(
    {
      placeholder,
      errorText = '',
      error = false,
      type = 'text',
      onIconClick,
      disabled,
      name
    }
  ) {

  const {inputValue, inputDefaultValue} = useSelector(state => ({
    inputValue: state.users.profile[name],
    inputDefaultValue: state.users.user[name],
  }))
  const updateInputValue = useInputValue('profile');
  const inputRef = useRef();
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
        inputRef.current.focus();
      }, 0);
    }

    onIconClick(name);
  }

  const handleChange = (e) => {
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

EditableInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  errorText: PropTypes.string,
  error: PropTypes.bool,
  type: PropTypes.string,
  onIconClick: PropTypes.func,
}