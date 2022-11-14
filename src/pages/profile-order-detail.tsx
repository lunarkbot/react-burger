import React, {FC, useEffect, useState} from 'react';
import styles from './profile-order-detail.module.css';
import {useParams} from 'react-router-dom';
import {TOrderDetailsPage, TOrderNumber, TOrdersResult} from '../types';
import {useAppDispatch, useAppSelector} from '../hooks';
import {useIngredientsById} from '../hooks/useIngredientsById';
import {wsClose, wsInit} from '../services/wsMiddlewareSlice';
import {OrderFullDetails} from '../components/OrderFullDetails/OrderFullDetails';
import BigSpinner from '../components/BigSpinner/BigSpinner';

export const ProfileOrderDetailsPage: FC<TOrderDetailsPage> = ({ isModal }) => {
  const { id }: TOrderNumber = useParams();
  const { items, isItemsLoaded } = useAppSelector(state => state.ingredients);
  const { ingredientsById, setIngredients } = useIngredientsById();
  const { isConnected, orders } = useAppSelector(state => state.wsMiddleware);
  const [order, setOrder] = useState<TOrdersResult | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isItemsLoaded && setIngredients(items);
  }, [isItemsLoaded])

  useEffect(() => {
    if (isConnected) return;

    const tokenSource = localStorage.getItem('accessToken');
    const token = tokenSource && tokenSource.replace('Bearer ','');
    if (!token) return;

    dispatch(wsInit(`?token=${token}`));

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
