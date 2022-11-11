import {FC, useEffect, useState} from 'react';
import styles from './IngredientsGroup.module.css';
import {useAppSelector} from '../../hooks';
import {IIngredient} from '../../types';

type TIngredientsGroup = {
  ingredients: string[];
}

type TLastIngredient = {
  image: string;
  length: number;
  name: string;
}

export const IngredientsGroup: FC<TIngredientsGroup> = ({ ingredients = [] }) => {

  const { items, isItemsLoaded } = useAppSelector(state => state.ingredients);
  const ingredientsList = ingredients.length > 6 ? ingredients.slice(0,5) : ingredients;
  const [lastIngredient, setLastIngredient] = useState<null | TLastIngredient>(null);

  useEffect(() => {
    if (isItemsLoaded && ingredients.length > 6) {
      const ingredientsGroup = ingredients.slice(5);
      const lastIngredient: IIngredient = items.filter((item) => item['_id'] === ingredientsGroup[0])[0];
      console.log(lastIngredient)
      setLastIngredient({
        image: lastIngredient.image_mobile,
        length: ingredientsGroup.length,
        name: lastIngredient.name,
      });
    }
  }, [isItemsLoaded])

  return (
    <ul className={styles.list}>
      {lastIngredient && <li className={styles.last}>
                            <img src={lastIngredient.image} alt={lastIngredient.name} />
                            <span className={styles.lastValue}>+{lastIngredient.length}</span>
                         </li>}
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
};
