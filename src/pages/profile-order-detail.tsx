import React, {FC} from 'react';
import ProfileContent from '../components/ProfileContent/ProfileContent';
import styles from './profile-order-detail.module.css';
import {useParams} from 'react-router-dom';
import {ScrollBox} from '../components/ScrollBox/ScrollBox';
import {OrderIngredient} from '../components/OrderIngredient/OrderIngredient';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {TOrderDetailsPage, TOrderNumber} from '../types';

export const ProfileOrderDetailsPage: FC<TOrderDetailsPage> = ({ isModal }) => {
  const { id }: TOrderNumber = useParams();

  return (
    <main className={`${styles.orderDetail} ${isModal && styles.orderDetailModal}`}>
      <div className={styles.order}>
        <p className={`${styles.orderNum} text text_type_digits-default`}>#{id}</p>
        <p className={`text text_type_main-medium mb-3`}>Black Hole Singularity острый бургер</p>
        <p className={`${styles.orderStatus} text text_type_main-small`}>Выполнен</p>
        <p className={`text text_type_main-medium mb-6`}>Состав:</p>
        <ScrollBox secondClass={styles.scrollBox}>
          <ul className={styles.orderIngredients}>

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
    </main>
  );
}
