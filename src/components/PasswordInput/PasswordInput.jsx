import React, {useState} from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function PasswordInput({onChange, value, placeholder, errorText = '', error = false}) {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  return (
    <Input
      type={isPasswordShow ? 'text' : 'password'}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name="password"
      error={error}
      icon={isPasswordShow ? 'HideIcon' : 'ShowIcon'}
      onIconClick={() => setIsPasswordShow(!isPasswordShow)}
      errorText={errorText}
      size="default"
    />
  );
}

export default PasswordInput;

PasswordInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  error: PropTypes.bool
}