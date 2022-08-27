import React from 'react';
import styles from './IngredientDetails.module.css';
import {useSelector} from 'react-redux';

export default function IngredientDetails() {

  const ingredientDetails = useSelector(state => state.ingredients.ingredientDetails);

  return (
    <>
      <img src={ingredientDetails.image_large} alt={ingredientDetails.text} className="mb-4" />
      <p className="text text_type_main-medium mb-8">
        {ingredientDetails.name}
      </p>
      <div className={styles.table}>
        <p className="text text_type_main-default text_color_inactive">
          Калории, ккал
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Белки, г
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Жиры, г
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Углеводы, г
        </p>
        <p className="text text_type_digits-default text_color_inactive">{ingredientDetails.calories}</p>
        <p className="text text_type_digits-default text_color_inactive">{ingredientDetails.proteins}</p>
        <p className="text text_type_digits-default text_color_inactive">{ingredientDetails.fat}</p>
        <p className="text text_type_digits-default text_color_inactive">{ingredientDetails.carbohydrates}</p>
      </div>
    </>
  );
}
