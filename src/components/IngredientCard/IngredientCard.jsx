import React, { useState } from 'react';
import styles from './IngredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {ingredientsTypes} from '../../utils/constants';

export default function IngredientCard ({info, showIngredientDetail}) {

  const handleClick = () => {
    showIngredientDetail(info)
  }

  const {count, setCount} = useState(false)

  return(
    <li className={styles.card} onClick={handleClick}>
      {count && <Counter count={0} size="default" />}
      <img className={styles.image} src={info.image} alt={info.name} />
      <div className={`${styles.price} text text_type_digits-default mb-1`}>
        {info.price}
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.text} text text_type_main-default`}>{info.name}</div>
    </li>
  );
}

IngredientCard.propTypes = {
  info: PropTypes.shape(ingredientsTypes).isRequired,
  showIngredientDetail: PropTypes.func.isRequired
}