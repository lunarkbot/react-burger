import store from '../services';
import {Action} from 'redux';

export interface IIngredientsItem {
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
  text: string;
}

export interface IIngredient {
  _id: string,
  image_large: string;
  text: string;
  name: string;
  calories: number;
  proteins: number;
  fat: number;
  carbohydrates: number;
  price: number;
  image_mobile: string;
}

export interface LocationState {
  from: {
    pathname: string;
  };
}

export interface IInput {
  isElement?: boolean;
  element?: HTMLInputElement | null;
  target?: EventTarget;
  value?: string;
}

export interface IMyObject {
  [key: string]: string | undefined;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TWsActions = {
  [key: string]: any;
};
export type TAppActions = {
  type: string;
  payload?: string;
}

export type TOrdersResult = {
  _id: string,
  createdAt: string,
  updatedAt: string,
  status: string,
  number: number,
  name: string,
  ingredients: string[],
}

export type TIngredientById = {
  [key: string]: IIngredient;
};

export type TOrderNumber = {
  id: string;
}

export type TOrderDetailsPage = {
  isModal: boolean;
}

export interface IOrderIngredientsNum {
  [key: string]: number;
}

export type TSelectedItems = {
  items: IIngredientsItem[],
  bun?: null | IIngredientsItem
}

export type TSendOrder = {
  ingredients: {
    items: IIngredientsItem[];
    bun: IIngredientsItem | null;
  }
}

export type TDispatch = typeof store.dispatch;
