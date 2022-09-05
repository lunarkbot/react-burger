import {useDispatch} from 'react-redux';
import {updateProfile, updateFormInput} from '../services/usersSlice';

export function useInputValue(type) {
  const dispatch = useDispatch();

  return (e) => {
    const element = e.isElement ? e.element : e.target;

    const data = {
      name: element.name,
      value: e.isElement ? e.value : element.value,
    }

    switch (type) {
      case 'profile':
        dispatch(updateProfile(data))
        break;
      default:
        dispatch(updateFormInput(data))
    }
  }
}