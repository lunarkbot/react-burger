import React, {FC, useEffect, useState} from 'react';
import ProfileContent from '../components/ProfileContent/ProfileContent';
import styles from './profile-order-detail.module.css';
import {useParams} from 'react-router-dom';
import {ScrollBox} from '../components/ScrollBox/ScrollBox';
import {OrderIngredient} from '../components/OrderIngredient/OrderIngredient';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {TOrderDetailsPage, TOrderNumber, TOrdersResult} from '../types';
import {useAppDispatch, useAppSelector} from '../hooks';
import {useIngredientsById} from '../hooks/useIngredientsById';
import {wsClose, wsInit} from '../services/wsProfileSlice';
import {OrderFullDetails} from '../components/OrderFullDetails/OrderFullDetails';
import BigSpinner from '../components/BigSpinner/BigSpinner';

export const ProfileOrderDetailsPage: FC<TOrderDetailsPage> = ({ isModal }) => {
  const { id }: TOrderNumber = useParams();
  const { items, isItemsLoaded } = useAppSelector(state => state.ingredients);
  const { ingredientsById, setIngredients } = useIngredientsById();
  const { isConnected, orders } = useAppSelector(state => state.wsProfile);
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
