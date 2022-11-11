import React, {FC} from 'react';
import styles from './OrderCard.module.css';
import {CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {IngredientsGroup} from '../IngredientsGroup/IngredientsGroup';
import {Link, useLocation, useRouteMatch} from 'react-router-dom';
import {TOrdersResult} from '../../types';

type TOrderCard = {
  order: TOrdersResult,
}

export const OrderCard: FC<TOrderCard> = ({ order }) => {
  const routeMatch = useRouteMatch('/profile/orders');
  const location = useLocation();

  return (
    <li className={styles.card}>
      <Link
        to={{
          pathname:  routeMatch
                      ? `/profile/orders/id`
                      : `/feed/id`,
          state: { background: location },
        }}
        className={styles.cardContent}
      >
        <div className={styles.orderInfo}>
          <p className={`${styles.orderNum} text text_type_digits-default`}>#{order.number}</p>
          <p
            className={`${styles.orderDate} text text_type_main-default text_color_inactive`}
          >Сегодня, 16:20 i-GMT+3</p>
        </div>
        <p className={`${styles.heading} text text_type_main-medium`}>{order.name}</p>
        <div className={styles.total}>
          <IngredientsGroup ingredients={order.ingredients} />
          <div className={styles.cost}>
            <p className="text text_type_digits-default">480</p>
            <CurrencyIcon  type="primary" />
          </div>
        </div>
      </Link>
    </li>
  );
};
