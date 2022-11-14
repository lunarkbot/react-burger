import React, {FC, useEffect, useState} from 'react';
import styles from './feed.module.css';
import {OrderCard} from '../components/OrderCard/OrderCard';
import {ScrollBox} from '../components/ScrollBox/ScrollBox';
import {useAppDispatch, useAppSelector} from '../hooks';
import {wsClose, wsInit} from '../services/wsMiddlewareSlice';
import {useIngredientsById} from '../hooks/useIngredientsById';
import {TOrdersResult} from '../types';

type TOrderStatus = {
  done: number[];
  pending: number[];
}

export const FeedPage: FC = () => {
  const { items, isItemsLoaded } = useAppSelector(state => state.ingredients);
  const { ingredientsById, setIngredients } = useIngredientsById();
  const [ ordersStatus, setOrderStatus ] = useState<TOrderStatus>({
    done: [],
    pending: [],
  });

  const { isConnected, orders, total, totalToday } = useAppSelector(state => state.wsMiddleware);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isItemsLoaded && setIngredients(items);
  }, [isItemsLoaded])

  useEffect(() => {
    if (!orders) return;

    const doneStatus: number[] = [];
    const pendingStatus: number[] = [];

    orders.forEach((order: TOrdersResult) => {
      if (order.status === 'done' && doneStatus.length < 20) {
        doneStatus.push(order.number);
      } else if (order.status === 'pending' && pendingStatus.length < 20) {
        pendingStatus.push(order.number);
      }
    });

    setOrderStatus({
      done: doneStatus,
      pending: pendingStatus,
    })
  }, [orders]);

  useEffect(() => {
    dispatch(wsInit('/all'));

    return () => {
      dispatch(wsClose('Соединение закрыто.'));
    }
  },[]);

  return (
    <main className={styles.main}>
      <h1 className="mb-5 text text_type_main-large">Лента заказов</h1>
      <div className={styles.twoColumns}>
        <ScrollBox secondClass={styles.scrollBox}>
          <ul className={styles.orderCards}>
            {orders && ingredientsById && orders.map((order) => {
              return (
                <OrderCard key={order._id} order={order} ingredientsById={ingredientsById} />
              );
            })}
          </ul>
        </ScrollBox>
        <div className={styles.infoTable}>
          <div className={styles.orders}>
            <p className="text text_type_main-medium">Готовы:</p>
            <ul className={`${styles.list} text text_type_digits-default`}>
              {
                ordersStatus.done.map((orderNumber) => {
                  return <li key={orderNumber}>{orderNumber}</li>
                })
              }
            </ul>
            <p className="text text_type_main-medium">В работе:</p>
            <ul className={`${styles.list} ${styles.listReady} text text_type_digits-default`}>
              {
                ordersStatus.pending.map((orderNumber) => {
                  return <li key={orderNumber}>{orderNumber}</li>
                })
              }
            </ul>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за все время:</p>
            <p className="text text_type_digits-large">{total && total.toLocaleString('ru')}</p>
          </div>
          <div>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-large">{totalToday && totalToday.toLocaleString('ru')}</p>
          </div>
        </div>
      </div>
    </main>
  );
};
