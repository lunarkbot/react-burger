import React, {FC, useEffect} from 'react';
import styles from './IngredientDetails.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getIngredientsDetails} from '../../services/ingredientsSlice';
import BigSpinner from '../BigSpinner/BigSpinner';
import {useAppSelector} from '../../hooks';
import {IIngredient, IIngredientsItem} from '../../types';

type TIngredientDetailsProps = {
  isModal: boolean;
}

type TIngredientParams = {
  ingredientId: string;
}

type TIngredientDetails = {
  ingredientDetails: IIngredient;
  items: IIngredientsItem[];
}

const IngredientDetails: FC<TIngredientDetailsProps> = ({ isModal }) => {
  const dispatch = useDispatch();
  const { ingredientDetails, items } = useAppSelector<TIngredientDetails>((state: any) => state.ingredients);
  const { ingredientId } = useParams<TIngredientParams>();

  useEffect(() => {
    dispatch(getIngredientsDetails(ingredientId))
  }, [items, dispatch])

  if (!ingredientDetails) {
    return <BigSpinner />
  }

  return (
    <div className={isModal ? '' : styles.detailsPage}>
      <p className={`text text_type_main-large pt-3 pb-3 pl-10 pr-10 ${styles.heading}`}>
        Детали ингредиента
      </p>
      <div className={styles.content}>
        <img src={ingredientDetails.image_large} alt={ingredientDetails.text} className="mb-4" />
        <p className="text text_type_main-medium mb-8">
          {ingredientDetails.name}
        </p>
        <div className={styles.table}>
          <p className="text text_type_main-default text_color_inactive">
            Калории,ккал
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
      </div>
    </div>
  );
}

export default IngredientDetails;
