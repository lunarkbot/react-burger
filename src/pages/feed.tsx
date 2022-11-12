import React, {FC, useEffect} from 'react';
import styles from './feed.module.css';
import {OrderCard} from '../components/OrderCard/OrderCard';
import {ScrollBox} from '../components/ScrollBox/ScrollBox';
import {useAppDispatch, useAppSelector} from '../hooks';
import {wsClose, wsInit} from '../services/wsFeedSlice';
import {useIngredientsById} from '../hooks/useIngredientsById';

export const FeedPage: FC = () => {
  const { items, isItemsLoaded } = useAppSelector(state => state.ingredients);
  const { ingredientsById, setIngredients } = useIngredientsById();

  const { isConnected, orders, total, totalToday } = useAppSelector(state => state.wsFeed);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isItemsLoaded && setIngredients(items);
  }, [isItemsLoaded])

  useEffect(() => {
    dispatch(wsInit(''));

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
              <li>034533</li>
              <li>034532</li>
              <li>034530</li>
              <li>034527</li>
              <li>034525</li>
            </ul>
            <p className="text text_type_main-medium">В работе:</p>
            <ul className={`${styles.list} ${styles.listReady} text text_type_digits-default`}>
              <li>034538</li>
              <li>034541</li>
              <li>034542</li>
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
