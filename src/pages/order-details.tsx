import React, {FC} from 'react';
import ProfileContent from '../components/ProfileContent/ProfileContent';
import styles from './order-details.module.css';
import {useParams} from 'react-router-dom';

type TOrderNumber = {
  orderNumber: string;
}

export const OrderDetailsPage: FC = () => {
  const { orderNumber }: TOrderNumber = useParams();

  return (
    <ProfileContent className={styles.content}>
      <div>Детали заказа #{orderNumber}</div>
    </ProfileContent>
  );
}
