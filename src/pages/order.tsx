import {FC} from 'react';
import styles from './order.module.css';
import {Order} from '../components/Order/Order';

export const OrderPage: FC = () => {
  return (
    <main className={styles.orderPage}>
      <Order />
    </main>
  );
};
