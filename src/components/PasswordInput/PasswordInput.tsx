import React, {useState, FC} from 'react';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

interface IPasswordInputProps {
  onChange: any;
  value: string;
  placeholder: string;
  errorText?: string;
  error?: boolean;
}

const PasswordInput: FC<IPasswordInputProps> = (
  {
    onChange,
    value,
    placeholder,
    errorText = '',
    error = false,
  }
) => {
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
