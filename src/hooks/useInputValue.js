import {useDispatch} from 'react-redux';
import {updateInput} from '../services/usersSlice';

export function useInputValue() {
  const dispatch = useDispatch();

  return (e) => {
    dispatch(updateInput({
      name: e.target.name,
      value: e.target.value
    }))
  }
}