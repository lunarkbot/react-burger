import {useDispatch} from 'react-redux';
import {updateProfile, updateFormInput} from '../services/usersSlice';

export function useInputValue(type) {
  const dispatch = useDispatch();

  return (e) => {
    const data = {
      name: e.target.name,
      value: e.target.value
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