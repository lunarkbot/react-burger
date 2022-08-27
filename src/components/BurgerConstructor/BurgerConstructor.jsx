import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  addQuantity,
  addSelectedItem,
  resetTotalPrice,
  setTotalPrice
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

export default function BurgerConstructor() {
  const {
    ingredients,
    totalPrice,
    selectedIngredients,
    orderDetail,
    isOrderDetailsShow
  } = useSelector(state => ({
    ingredients: state.ingredients.items,
    totalPrice: state.ingredients.totalPrice,
    selectedIngredients: state.ingredients.selectedItems,
    orderDetail: state.orders.orderDetail,
    isOrderDetailsShow: state.orders.isOrderDetailsShow,
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    ingredients.forEach(item => {
      dispatch(addSelectedItem(item))
    })
  }, [ingredients])

  React.useEffect(() => {
    dispatch(resetTotalPrice());
    dispatch(setTotalPrice());
  }, [selectedIngredients]);


  const handleClickOrderButton = () => {
    dispatch(sendOrder({
      ingredients: selectedIngredients,
    }))
  }

  const handleClickClose = () => {
    dispatch(hideOrderDetails());
  }

  const [, dropTarget] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    drop(source) {
      dispatch(addSelectedItem(source.item));
      dispatch(addQuantity({
        type: source.type,
        id: source.id
      }))
    }
  })

  return(
    <>
      <section>
        <div className={`${styles.listWrap} mb-10`} ref={dropTarget}>
          {selectedIngredients.bun && <Bun item={selectedIngredients.bun} type="top" />}
          <ul className={`${styles.list} ${styles.scrollBox}`}>
            {selectedIngredients.items.map((item, index) => {
              if (item && item.type !== 'bun') {
                return (
                  <ConstructorItem item={item} key={item.uid} />
                )
              }
            })}
          </ul>
          {selectedIngredients.bun && <Bun item={selectedIngredients.bun} type="bottom" />}
        </div>

        <div className={styles.priceWrap}>
          <div className={`text text_type_digits-medium ${styles.price}`}>
            {totalPrice ? totalPrice.toLocaleString() : 0}
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={handleClickOrderButton}>
            Оформить заказ
          </Button>
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
