import React, {FC, useEffect, useState} from 'react';
import styles from './OrderFullDetails.module.css';
import {ScrollBox} from '../ScrollBox/ScrollBox';
import {OrderIngredient} from '../OrderIngredient/OrderIngredient';
import { IOrderIngredientsNum, TIngredientById, TOrdersResult} from '../../types';
import {OrderDate} from '../OrderDate/OrderDate';
import {TotalCost} from '../TotalCost/TotalCost';

type TOrderFullDetails = {
  order: TOrdersResult;
  ingredientsById: TIngredientById;
}

export const OrderFullDetails: FC<TOrderFullDetails> = ({ order, ingredientsById}) => {
  const [orderIngredientsNum, setOrderIngredientsNum] = useState<IOrderIngredientsNum | null>(null);
  const [orderIngredients, setOrderIngredients] = useState<string[] | null>(null);

  useEffect(() => {
    const orderIngredientsNum: IOrderIngredientsNum = {};
    const orderIngredients: string[] = [];

    order.ingredients.forEach((ingredient) => {
      if (orderIngredientsNum[ingredient]) {
        orderIngredientsNum[ingredient] += 1;
      } else {
        orderIngredientsNum[ingredient] = 1;
      }

      if (!orderIngredients.includes(ingredient)) orderIngredients.push(ingredient);
    });

    setOrderIngredientsNum(orderIngredientsNum);
    setOrderIngredients(orderIngredients);
  }, [order]);

  return (
    <div className={styles.order}>
      <p className={`${styles.orderNum} text text_type_digits-default`}>#{order.number}</p>
      <p className={`text text_type_main-medium mb-3`}>{order.name}</p>
      <p className={`${styles.orderStatus} text text_type_main-small`}>
        {order.status === 'pending' ? 'В работе' : 'Готов'}
      </p>
      <p className={`text text_type_main-medium mb-6`}>Состав:</p>
      <ScrollBox secondClass={styles.scrollBox}>
        <ul className={styles.orderIngredients}>
          {orderIngredients && orderIngredientsNum &&
            orderIngredients.map((ingredient, index) => {
              return <OrderIngredient
                      key={index}
                      name={ingredientsById[ingredient].name}
                      image={ingredientsById[ingredient].image_mobile}
                      price={ingredientsById[ingredient].price}
                      num={orderIngredientsNum[ingredient]}
                     />
            })
          }
        </ul>
      </ScrollBox>
      <div className={styles.orderInfo}>
        <OrderDate date={order.createdAt} />
        <TotalCost ingredients={order.ingredients} ingredientsById={ingredientsById} />
      </div>
    </div>
  );
}
