import React, {FC, useEffect, useState} from 'react';
import styles from './feed-order-details.module.css';
import {useParams} from 'react-router-dom';
import { TOrderDetailsPage, TOrderNumber, TOrdersResult} from '../types';
import {OrderFullDetails} from '../components/OrderFullDetails/OrderFullDetails';
import {useAppDispatch, useAppSelector} from '../hooks';
import {useIngredientsById} from '../hooks/useIngredientsById';
import {wsClose, wsInit} from '../services/wsFeedSlice';
import BigSpinner from '../components/BigSpinner/BigSpinner';

export const FeedOrderDetailsPage: FC<TOrderDetailsPage> = ({ isModal }) => {
  const { id }: TOrderNumber = useParams();
  const { items, isItemsLoaded } = useAppSelector(state => state.ingredients);
  const { ingredientsById, setIngredients } = useIngredientsById();
  const { isConnected, orders } = useAppSelector(state => state.wsFeed);
  const [order, setOrder] = useState<TOrdersResult | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isItemsLoaded && setIngredients(items);
  }, [isItemsLoaded])

  useEffect(() => {
    if (isConnected) return;

    dispatch(wsInit(''));

    return () => {
      dispatch(wsClose('Соединение закрыто.'));
    }
  },[]);

  useEffect(() => {
    if (!orders) return;

    const result: TOrdersResult[] = orders.filter((order) => order._id === id);
    setOrder(result[0]);
  }, [orders]);

  return (
    <>
      {isModal

      ? <div className={`${styles.orderDetail} ${styles.orderDetailModal}`}>
          {order && ingredientsById &&
            <OrderFullDetails order={order} ingredientsById={ingredientsById} />}
        </div>

      : <main className={`${styles.orderDetail}`}>
          {order && ingredientsById
            ? <OrderFullDetails order={order} ingredientsById={ingredientsById}  />
            : <BigSpinner />
          }
        </main>
      }
    </>
  );
}
