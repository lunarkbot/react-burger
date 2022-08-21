import React, {useMemo} from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {FoodDataContext} from '../../contexts/foodDataContext';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';

const totalPrice = { price: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'set':
      let wasBun = false;
      let totalPrice = 0;
      action.data.forEach(item => {
        if (!wasBun && item.type === 'bun') {
          totalPrice += item.price * 2;
          wasBun = true;
        } else if (item.type !== 'bun') {
          totalPrice += item.price;
        }
      })

      return { price: totalPrice };
    case 'reset':
      return { price: 0 }
    default:
      throw new Error(`Wrong type of action ${action.type}`);
  }
}

export default function BurgerConstructor() {
  const foodData = React.useContext(FoodDataContext);
  const bun = foodData.filter(item => item.type === 'bun')[0];
  const [isPopupVisible, setIsPopupVisible] = React.useState(false);
  const [totalPriceState, totalPriceDispatcher] = React.useReducer(reducer, totalPrice,undefined);

  React.useEffect(() => {
    totalPriceDispatcher( {type: 'set', data: foodData });
  }, [foodData]);

  const handleClickOrderButton = () => {
    setIsPopupVisible(true);
  }

  const handleClickClose = () => {
    setIsPopupVisible(false);
  }

  return(
    <>
      <section>
        <div className={`${styles.listWrap} mb-10`}>
          <div className={`${styles.edgeElement} pl-8`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun?.name} (верх)`}
              price={bun?.price}
              thumbnail={bun?.image}
            />
          </div>
          <ul className={`${styles.list} ${styles.scrollBox}`}>
            {foodData.map(item => {
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
          <div className={`${styles.edgeElement} pl-8`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
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
          <OrderDetails />
        </Modal>
      }

    </>

  )
}
