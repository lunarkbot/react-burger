import styles from './TotalCost.module.css';
import React, {FC} from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {TIngredientById} from '../../types';

type TTotalCost = {
  ingredients: string[];
  ingredientsById: TIngredientById;
}

export const TotalCost: FC<TTotalCost> = ({ ingredients, ingredientsById }) => {

  const total: number = ingredients.reduce((acc: number, item: string) => {
    return acc += ingredientsById[item].price;
  }, 0);

  return (
    <div className={styles.cost}>
      <p className="text text_type_digits-default">{total.toLocaleString('ru')}</p>
      <CurrencyIcon  type="primary" />
    </div>
  );
}
