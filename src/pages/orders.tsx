import React, {FC, useEffect} from 'react';
import styles from './orders.module.css';
import ProfileContent from '../components/ProfileContent/ProfileContent';
import {OrderCard} from '../components/OrderCard/OrderCard';
import {ScrollBox} from '../components/ScrollBox/ScrollBox';
import {useAppDispatch, useAppSelector} from '../hooks';
import {useIngredientsById} from '../hooks/useIngredientsById';
import {wsClose, wsInit} from '../services/wsProfileSlice';
import BigSpinner from '../components/BigSpinner/BigSpinner';

export const OrdersPage: FC = () => {
  const { items, isItemsLoaded } = useAppSelector(state => state.ingredients);
  const { ingredientsById, setIngredients } = useIngredientsById();
  const { isConnected, orders } = useAppSelector(state => state.wsProfile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    isItemsLoaded && setIngredients(items);
  }, [isItemsLoaded])

  useEffect(() => {
    const tokenSource = localStorage.getItem('accessToken');
    const token = tokenSource && tokenSource.replace('Bearer ','');

    if (!token) return;

    dispatch(wsInit(`?token=${token}`));

    return () => {
      dispatch(wsClose('Соединение закрыто.'));
    }
  },[]);

  return (
    <ProfileContent className={styles.content}>
      {orders && ingredientsById
        ? <ScrollBox secondClass={styles.scrollBox}>
            <ul className={styles.orderCards}>
              {orders.map((order) => {
                return (
                  <OrderCard key={order._id} order={order} ingredientsById={ingredientsById} />
                );
              })}
            </ul>
          </ScrollBox>
      : <BigSpinner />}
    </ProfileContent>
  );
}
