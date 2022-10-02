import {string} from 'prop-types';

interface IIngredientsItem {
  quantity: number;
  calories: number;
  carbohydrates: number;
  fat: number;
  price: number;
  proteins: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  type: string;
  _id: string;
  uid?: string;
  id?: string;
}

interface IIngredient {
  image_large: string;
  text: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
}

interface LocationState {
  from: {
    pathname: string;
  };
}

interface IInput {
  isElement?: boolean;
  element?: HTMLInputElement | null;
  target?: EventTarget;
  value?: string;
}

interface IMyObject {
  [key: string]: string | undefined;
}
