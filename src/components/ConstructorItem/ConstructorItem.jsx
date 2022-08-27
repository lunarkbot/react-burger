import styles from './ConstructorItem.module.css';
import React from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {ingredientsTypes} from '../../utils/constants';
import {useDispatch, useSelector} from 'react-redux';
import {decreaseQuantity, deleteSelectedItem} from '../../services/ingredientsSlice';

function ConstructorItem({ item }) {
  const dispatch = useDispatch();
  const selectedIngredients = useSelector(state => state.ingredients.selectedItems.items);

  function handleClose() {
    dispatch(deleteSelectedItem({
      uid: item.uid,
      items: selectedIngredients
    }));
    dispatch(decreaseQuantity(item._id));
  }

  return (
    <li className={styles.listItem}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
      />
    </li>
  );
}

export default ConstructorItem;

ConstructorItem.propTypes = {
  item: PropTypes.shape(ingredientsTypes).isRequired,
}