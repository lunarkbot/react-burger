import React, {FC} from 'react';
import ProfileContent from '../components/ProfileContent/ProfileContent';
import styles from './orders.module.css';
import {Link} from 'react-router-dom';

export const OrdersPage: FC = () => {

  return (
    <ProfileContent className={styles.content}>
      <Link to="/profile/orders/1" className={styles.link}>
        Первый заказ
      </Link>
      <Link to="/profile/orders/2" className={styles.link}>
        Второй заказ
      </Link>
      <Link to="/profile/orders/3" className={styles.link}>
        Третий заказ
      </Link>
    </ProfileContent>
  );
}
