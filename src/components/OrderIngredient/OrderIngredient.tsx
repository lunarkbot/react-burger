import React, {FC} from 'react';
import styles from './OrderIngredient.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export const OrderIngredient: FC = () => {
  return (
    <li className={styles.orderIngredient}>
      <div className={styles.ingredientIco}></div>
      <div className={styles.ingredientHeading}>
        <p className="text text_type_main-small">
          Филе Люминесцентного тетраодонтимформа
        </p>
      </div>
      <div className={styles.ingredientCost}>
        <p className="text text_type_digits-default">1 x 30</p>
        <CurrencyIcon  type="primary" />
      </div>
    </li>
  );
};
