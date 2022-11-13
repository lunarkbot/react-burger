import React, {FC} from 'react';
import styles from './OrderIngredient.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

type TOrderIngredient = {
  name: string;
  num: number;
  image: string;
  price: number;
}

export const OrderIngredient: FC<TOrderIngredient> = ({
                                                        num,
                                                        name,
                                                        price,
                                                        image
                                                      }) => {
  return (
    <li className={styles.orderIngredient}>
      <div className={styles.ingredientIco}>
        <img src={image} alt={name} />
      </div>
      <div className={styles.ingredientHeading}>
        <p className="text text_type_main-small">
          {name}
        </p>
      </div>
      <div className={styles.ingredientCost}>
        <p className="text text_type_digits-default">{num} x {price}</p>
        <CurrencyIcon  type="primary" />
      </div>
    </li>
  );
};
