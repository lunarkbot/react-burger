import React from 'react';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {FoodDataContext} from '../../contexts/foodDataContext';

export default function BurgerIngredients() {
  const foodData = React.useContext(FoodDataContext);
  const bun = foodData.filter(item => item.type === 'bun')[0];

  return(
    <section>
      <div className={`${styles.listWrap} mb-10`}>
        <div className={`${styles.edgeElement} pl-8`}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
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
          610
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}