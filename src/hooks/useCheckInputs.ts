import {useDispatch} from 'react-redux';
import { showError, hideError } from '../services/errorsSlice';

function hasInputError(name: string, value: string): string {
  switch (name) {
    case 'email':
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return !reg.test(value)
          ? 'Введите корректный email' : '';
    case 'password':
        return value.length < 8
          ? 'Пароль не может быть короче 8 символов' : '';
    case 'token':
        return value.length < 36
          ? 'Код не может быть меньше 36 символов' : '';
    default:
        return value.length < 2
          ? 'Значение не может быть короче 2 символов' : '';
  }
}

export function useCheckInputs() {
  const dispatch = useDispatch();

  return (inputs: {[key: string]: string}): boolean => {
    let hasError = false;

    for (let name in inputs) {
      const value = inputs[name];
      const text = hasInputError(name, value);

      if (text) {
        hasError = true;
        dispatch(showError({
          name,
          text
        }))
      } else {
        dispatch(hideError({
          name
        }))
      }
    }
    return hasError;
  }
}
