import React, { useState } from 'react';
import styles from './IngredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {ingredientsTypes} from '../../utils/constants';
import {useDispatch} from 'react-redux';
import {setIngredientDetails} from '../../services/ingredientsSlice';
import {useDrag} from 'react-dnd';

export default function IngredientCard ({ item }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIngredientDetails(item))
  }

  const [{opacity},dragRef] = useDrag({
    type: item.type,
    item: {
      id: item._id,
      type: item.type,
      item
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.2 : 1
    })
  })

  return(
    <li className={styles.card} onClick={handleClick} ref={dragRef} style={{opacity}}>
      {item.quantity !== 0 && <Counter count={item.quantity} size="default" />}
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