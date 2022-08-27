import React, {useEffect, useState} from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import IngredientList from '../IngredientList/IngredientList';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import {useDispatch, useSelector} from 'react-redux';
import {addSelectedItem, getIngredients, resetIngredientDetails} from '../../services/ingredientsSlice';

export default function BurgerIngredients() {
  const dispatch = useDispatch();
  const { ingredients, ingredientDetails } = useSelector(state => ({
    ingredients: state.ingredients.items,
    ingredientDetails: state.ingredients.ingredientDetails,
  }));



  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

  useEffect(() => {
    dispatch(addSelectedItem(ingredients[0]));
  }, [ingredients])

  const handleClickClose = () => {
    dispatch(resetIngredientDetails())
  }

  return(
    <>
      <section>
        <Tabs />
        <div className={styles.scrollBox}>
          <div className="text text_type_main-medium mb-6">Булки</div>
          <IngredientList
            type="bun" />
          <div className="text text_type_main-medium mb-6">Соусы</div>
          <IngredientList
            type="sauce" />
          <div className="text text_type_main-medium mb-6">Начинки</div>
          <IngredientList
            type="main" />
        </div>
      </section>

      {ingredientDetails &&
        <Modal heading="Детали ингредиента" onClose={handleClickClose}>
          <IngredientDetails />
        </Modal>
      }
    </>
  )
}