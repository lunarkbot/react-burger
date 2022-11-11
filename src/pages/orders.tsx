import React, {FC} from 'react';
import styles from './orders.module.css';
import ProfileContent from '../components/ProfileContent/ProfileContent';
import {OrderCard} from '../components/OrderCard/OrderCard';
import {ScrollBox} from '../components/ScrollBox/ScrollBox';

export const OrdersPage: FC = () => {

  return (
    <ProfileContent className={styles.content}>
      <ScrollBox secondClass={styles.scrollBox}>
        <ul className={styles.orderCards}>
          {/*<OrderCard />*/}
          {/*<OrderCard />*/}
          {/*<OrderCard />*/}
          {/*<OrderCard />*/}
          {/*<OrderCard />*/}
          {/*<OrderCard />*/}
          {/*<OrderCard />*/}
          {/*<OrderCard />*/}
        </ul>
      </ScrollBox>
    </ProfileContent>
  );
}
