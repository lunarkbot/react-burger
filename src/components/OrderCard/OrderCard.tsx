import React, {FC} from 'react';
import styles from './OrderCard.module.css';
import {CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientsGroup} from '../IngredientsGroup/IngredientsGroup';

export const OrderCard: FC = () => {
  return (
    <li className={styles.card}>
      <div className={styles.orderInfo}>
        <p className={`${styles.orderNum} text text_type_digits-default`}>#034535</p>
        <p
          className={`${styles.orderDate} text text_type_main-default text_color_inactive`}
        >Сегодня, 16:20 i-GMT+3</p>
      </div>
      <p className={`${styles.heading} text text_type_main-medium`}>Death Star Starship Main бургер</p>
      <div className={styles.total}>
        <IngredientsGroup />
        <div className={styles.cost}>
          <p className="text text_type_digits-default">480</p>
          <CurrencyIcon  type="primary" />
        </div>
      </div>
    </li>
  );
};
