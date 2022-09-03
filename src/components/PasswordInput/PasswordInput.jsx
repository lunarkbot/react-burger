import React, {useState} from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

function PasswordInput({handleChange, value, placeholder}) {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  return (
    <Input
      type={isPasswordShow ? 'text' : 'password'}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
      name="password"
      error={false}
      icon={isPasswordShow ? 'HideIcon' : 'ShowIcon'}
      onIconClick={() => setIsPasswordShow(!isPasswordShow)}
      errorText="Ошибка"
      size="default"
    />
  );
}

export default PasswordInput;