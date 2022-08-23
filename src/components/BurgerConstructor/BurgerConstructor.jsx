import React, {useMemo} from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {FoodDataContext} from '../../contexts/foodDataContext';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import Bun from '../Bun/Bun';
import Api from '../../utils/api';

const totalPrice = { price: 0 };

function totalPriceReducer(state, action) {
  switch (action.type) {
    case 'set':
      let totalPrice = state.price;
      action.ingredients.forEach(item => {
        totalPrice += item.price;
      })
      totalPrice += action.bun ? action.bun.price * 2 : 0;
      return { price: totalPrice };
    case 'reset':
      return { price: 0 }
    default:
      throw new Error(`Wrong type of action ${action.type}`);
  }
}

const orderedIngredients = {
  ingredients: [],
  bun: null
};

function orderedIngredientsReducer (state, action) {
  switch (action.type) {
    case 'add':
      if (action.item.type === 'bun') {
        return {
          ...state,
          bun: action.item
        }
      } else {
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            action.item
          ]
        }
      }
    case 'reset':
      return { ingredients: [], bun: null }
    default:
      throw new Error(`Wrong type of action ${action.type}`);
  }
}

export default function BurgerConstructor() {
  const foodData = React.useContext(FoodDataContext);
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);
  const [orderedIngredientsState, orderedIngredientsDispatcher] = React.useReducer(
    orderedIngredientsReducer,
    orderedIngredients,
    undefined
  )
  const [totalPriceState, totalPriceDispatcher] = React.useReducer(totalPriceReducer, totalPrice,undefined);
  const [orderDetail, setOrderDetail] = React.useState(null);

  React.useEffect(() => {
    orderedIngredientsDispatcher({
      type: 'reset'
    });

    foodData.forEach(item => {
      orderedIngredientsDispatcher(
        {
          type: 'add',
          item
        }
      )
    });

  }, [foodData])

  React.useEffect(() => {
    totalPriceDispatcher( {type: 'reset' });
    totalPriceDispatcher( {
      type: 'set',
      ingredients: orderedIngredientsState.ingredients,
      bun: orderedIngredientsState.bun
    });
  }, [orderedIngredientsState]);


  const handleClickOrderButton = () => {
    Api.sendOrder(orderedIngredientsState)
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
          {orderedIngredientsState.bun && <Bun item={orderedIngredientsState.bun} type="top" />}
          <ul className={`${styles.list} ${styles.scrollBox}`}>
            {orderedIngredientsState.ingredients.map(item => {
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
          {orderedIngredientsState.bun && <Bun item={orderedIngredientsState.bun} type="bottom" />}
        </div>

        <div className={styles.priceWrap}>
          <div className={`text text_type_digits-medium ${styles.price}`}>
            {totalPriceState.price.toLocaleString()}
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
