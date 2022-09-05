import {useDispatch} from 'react-redux';
import { showError, hideError } from '../services/errorsSlice';

function hasInputError(name, value) {
  switch (name) {
    case 'email':
        return value.length < 4 && value.indexOf('@') === -1
          ? 'Введите корректный email' : false;
    default:
        return value.length < 2
          ? 'Значение не может быть короче 2 символов' : false;
  }
}

export function useCheckInputs() {
  const dispatch = useDispatch();

  return (inputs) => {
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
