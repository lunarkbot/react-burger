import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addQuantity,
  addSelectedItem,
  resetTotalPrice,
  setTotalPrice,
  updateSelectedList,
  resetSelectedItem,
} from '../../services/ingredientsSlice';
import styles from './BurgerConstructor.module.css';
import {
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import Bun from '../Bun/Bun';
import {hideOrderDetails, sendOrder} from '../../services/ordersSlice';
import {useDrop} from 'react-dnd';
import ConstructorItem from '../ConstructorItem/ConstructorItem';
import Spinner from '../Spinner/Spinner';
import {Redirect, useHistory} from 'react-router-dom';

export default function BurgerConstructor() {
  const {
    totalPrice,
    selectedIngredients,
    orderDetail,
    isOrderDetailsShow,
    orderDetailRequest,
  } = useSelector(state => ({
    totalPrice: state.ingredients.totalPrice,
    selectedIngredients: state.ingredients.selectedItems,
    orderDetail: state.orders.orderDetail,
    isOrderDetailsShow: state.orders.isOrderDetailsShow,
    orderDetailRequest: state.orders.orderDetailRequest,
  }));

  const { isAuth } = useSelector(state => state.users.user)
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(resetTotalPrice());
    dispatch(setTotalPrice());
  }, [selectedIngredients]);


  const handleClickOrderButton = () => {
    if (isAuth) {
      dispatch(sendOrder({
        ingredients: selectedIngredients,
      }))
    } else {
      history.push('/login');
    }
  }

  const handleClickClose = () => {
    dispatch(hideOrderDetails());
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    collect: monitor => ({
      isHover: monitor.isOver(),
    }),
    drop(source) {
      dispatch(addSelectedItem(source.item));
      dispatch(addQuantity({
        type: source.type,
        id: source.id
      }))
    }
  })

  useEffect(() => {
    if (isOrderDetailsShow) dispatch(resetSelectedItem());
  }, [isOrderDetailsShow, resetSelectedItem])


  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = selectedIngredients.items[dragIndex];
    const newCards = [...selectedIngredients.items]

    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)

    dispatch(updateSelectedList(newCards));
  }, [selectedIngredients, dispatch]);

  return(
    <>
      <section>
        <div className={`${styles.listWrap} ${isHover && styles.onHover} mb-10`} ref={dropTarget}>
          {selectedIngredients.bun && <Bun item={selectedIngredients.bun} type="top" />}
          {(selectedIngredients.bun || Boolean(selectedIngredients.items.length)) &&
            <ul className={`${styles.list} ${styles.scrollBox}`}>
            {selectedIngredients.items.map((item, index) => {
              if (item && item.type !== 'bun') {
                return (
                  <ConstructorItem
                    item={item}
                    index={index}
                    key={item.uid}
                    moveCard={moveCard}
                  />
                )
              }
            })}
          </ul>}
          {selectedIngredients.bun && <Bun item={selectedIngredients.bun} type="bottom" />}
        </div>

        <div className={styles.priceWrap}>
          <div className={`text text_type_digits-medium ${styles.price}`}>
            {totalPrice ? totalPrice.toLocaleString() : 0}
            <CurrencyIcon type="primary" />
          </div>
          <div className={`${styles.submitButton} ${!selectedIngredients.bun ? styles.submitButtonDisabled : ''}`}>
            <Button type="primary" size="large" onClick={handleClickOrderButton}>
              {orderDetailRequest ? (
                  <>Оформить заказ</>
                )
                : (
                  <div className={styles.submitButtonSpinner}>Еще секунду <Spinner /></div>
                )
              }
            </Button>
          </div>
        </div>
      </section>

      {isOrderDetailsShow &&
        <Modal onClose={handleClickClose}>
          <OrderDetails details={orderDetail} />
        </Modal>
      }

    </>

  )
}
