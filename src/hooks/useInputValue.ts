import {updateProfile, updateFormInput} from '../services/usersSlice';
import {IInput} from '../types';
import {useAppDispatch} from './index';

export function useInputValue(type?: string) {
  const dispatch = useAppDispatch();

  return (e: IInput) => {
    const element: HTMLInputElement = (e.isElement ? e.element : e.target) as HTMLInputElement;

    const data = {
      name: element?.name,
      value: e.isElement ? e.value : element?.value,
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
