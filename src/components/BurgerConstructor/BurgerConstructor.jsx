import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addSelectedItem, resetSelectedItems, resetTotalPrice, setTotalPrice} from '../../store/ingredientsSlice';
import styles from './BurgerConstructor.module.css';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import Bun from '../Bun/Bun';
import Api from '../../utils/api';

export default function BurgerConstructor() {
  const {
    ingredients,
    totalPrice,
    selectedIngredients,
  } = useSelector(state => ({
    ingredients: state.ingredients.items,
    totalPrice: state.ingredients.totalPrice,
    selectedIngredients: state.ingredients.selectedItems,
  }));

  const dispatch = useDispatch();

  const [isPopupVisible, setIsPopupVisible] = React.useState(false);


  const [orderDetail, setOrderDetail] = React.useState(null);

  React.useEffect(() => {
    dispatch(resetSelectedItems());

    ingredients.forEach(item => {
      dispatch(addSelectedItem(item))
    })
  }, [ingredients])

  React.useEffect(() => {
    dispatch(resetTotalPrice());
    dispatch(setTotalPrice());
  }, [selectedIngredients]);


  const handleClickOrderButton = () => {
    Api.sendOrder(selectedIngredients)
      .then(data => {
        setOrderDetail({
          ...data
        });
        setIsPopupVisible(true);
      })
      .catch(err => console.log(err));
  }

  const handleClickClose = () => {
    setIsPopupVisible(false);
  }

  return(
    <>
      <section>
        <div className={`${styles.listWrap} mb-10`}>
          {selectedIngredients.bun && <Bun item={selectedIngredients.bun} type="top" />}
          <ul className={`${styles.list} ${styles.scrollBox}`}>
            {selectedIngredients.items.map(item => {
              if (item.type !== 'bun') {
                return (
                  <li key={item._id} className={styles.listItem}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                    />
                  </li>
                )
              }
            })}
          </ul>
          {selectedIngredients.bun && <Bun item={selectedIngredients.bun} type="bottom" />}
        </div>

        <div className={styles.priceWrap}>
          <div className={`text text_type_digits-medium ${styles.price}`}>
            {totalPrice.toLocaleString()}
            <CurrencyIcon type="primary" />
          </div>
          <Button type="primary" size="large" onClick={handleClickOrderButton}>
            Оформить заказ
          </Button>
        </div>
      </section>

      {isPopupVisible &&
        <Modal onClose={handleClickClose}>
          <OrderDetails details={orderDetail} />
        </Modal>
      }

    </>

  )
}
