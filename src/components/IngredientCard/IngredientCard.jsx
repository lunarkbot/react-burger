import React, { useState } from 'react';
import styles from './IngredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {ingredientsTypes} from '../../utils/constants';
import {useDispatch} from 'react-redux';
import {setIngredientDetails} from '../../services/ingredientsSlice';

export default function IngredientCard ({ item }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIngredientDetails(item))
  }

  return(
    <li className={styles.card} onClick={handleClick}>
      {item.amount !== 0 && <Counter count={item.amount} size="default" />}
      <img className={styles.image} src={item.image} alt={item.name} />
      <div className={`${styles.price} text text_type_digits-default mb-1`}>
        {item.price}
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.text} text text_type_main-default`}>{item.name}</div>
    </li>
  );
}

IngredientCard.propTypes = {
  item: PropTypes.shape(ingredientsTypes).isRequired,
}