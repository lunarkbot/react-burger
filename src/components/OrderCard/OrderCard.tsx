import React, {FC} from 'react';
import styles from './OrderCard.module.css';
import {IngredientsGroup} from '../IngredientsGroup/IngredientsGroup';
import {Link, useLocation, useRouteMatch} from 'react-router-dom';
import {TOrdersResult, TIngredientById} from '../../types';
import {TotalCost} from '../TotalCost/TotalCost';
import {OrderDate} from '../OrderDate/OrderDate';

type TOrderCard = {
  order: TOrdersResult,
  ingredientsById: TIngredientById,
}

export const OrderCard: FC<TOrderCard> = ({ order, ingredientsById }) => {
  const routeMatch = useRouteMatch('/profile/orders');
  const location = useLocation();

  return (
    <li className={styles.card}>
      <Link
        to={{
          pathname:  routeMatch
                      ? `/profile/orders/${order._id}`
                      : `/feed/${order._id}`,
          state: { background: location },
        }}
        className={styles.cardContent}
      >
        <div className={styles.orderInfo}>
          <p className={`${styles.orderNum} text text_type_digits-default`}>#{order.number}</p>
          <OrderDate date={order.createdAt} />
        </div>
        <p className={`${styles.heading} text text_type_main-medium`}>{order.name}</p>
        <div className={styles.total}>
          <IngredientsGroup ingredients={order.ingredients} ingredientsById={ingredientsById} />
          <TotalCost ingredients={order.ingredients} ingredientsById={ingredientsById} />
        </div>
      </Link>
    </li>
  );
};
