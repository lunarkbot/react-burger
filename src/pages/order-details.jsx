import React from 'react';
import ProfileContent from '../components/ProfileContent/ProfileContent';
import styles from './order-details.module.css';
import {useParams} from 'react-router-dom';

export function OrderDetailsPage() {
  const order = useParams();

  return (
    <ProfileContent className={styles.content}>
      <div>Детали заказа #{order.orderNumber}</div>
    </ProfileContent>
  );
}
