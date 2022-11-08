import React, {FC} from 'react';
import styles from './Order.module.css';
import {ScrollBox} from '../ScrollBox/ScrollBox';
import {OrderIngredient} from '../OrderIngredient/OrderIngredient';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

export const Order: FC = () => {
  return (
    <div className={styles.order}>
      <p className={`${styles.orderNum} text text_type_digits-default`}>#1234567890</p>
      <p className={`text text_type_main-medium mb-3`}>Black Hole Singularity острый бургер</p>
      <p className={`${styles.orderStatus} text text_type_main-small`}>Выполнен</p>
      <p className={`text text_type_main-medium mb-6`}>Состав:</p>
      <ScrollBox secondClass={styles.scrollBox}>
        <ul className={styles.orderIngredients}>
          <OrderIngredient />
          <OrderIngredient />
          <OrderIngredient />
          <OrderIngredient />
          <OrderIngredient />
          <OrderIngredient />
          <OrderIngredient />
        </ul>
      </ScrollBox>
      <div className={styles.orderInfo}>
        <p
          className={`text text_type_main-default text_color_inactive`}
        >Сегодня, 16:20 i-GMT+3</p>
        <div className={styles.orderTotal}>
          <p className={`text text_type_digits-default`}>510</p>
          <CurrencyIcon  type="primary" />
        </div>
      </div>
    </div>
  );
};
