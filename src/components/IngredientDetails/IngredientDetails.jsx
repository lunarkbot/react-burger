import React from 'react';
import styles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import {ingredientsTypes} from '../../utils/constants';

export default function IngredientDetails({ingredientInfo}) {

  return (
    <>
      <img src={ingredientInfo.image_large} alt={ingredientInfo.text} className="mb-4" />
      <p className="text text_type_main-medium mb-8">
        {ingredientInfo.name}
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
        <p className="text text_type_digits-default text_color_inactive">{ingredientInfo.calories}</p>
        <p className="text text_type_digits-default text_color_inactive">{ingredientInfo.proteins}</p>
        <p className="text text_type_digits-default text_color_inactive">{ingredientInfo.fat}</p>
        <p className="text text_type_digits-default text_color_inactive">{ingredientInfo.carbohydrates}</p>
      </div>
    </>
  );
}

IngredientDetails.propTypes = {
  ingredientInfo: PropTypes.shape(ingredientsTypes).isRequired
}
