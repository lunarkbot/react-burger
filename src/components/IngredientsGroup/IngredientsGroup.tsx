import {FC, useEffect} from 'react';
import styles from './IngredientsGroup.module.css';
import {useAppSelector} from '../../hooks';
import {useIngredientsList} from '../../hooks/useIngredientsList';

type TIngredientsGroup = {
  ingredients: string[];
}

export const IngredientsGroup: FC<TIngredientsGroup> = ({ ingredients = [] }) => {
  const { items, isItemsLoaded } = useAppSelector(state => state.ingredients);
  const { firstIngredients, lastIngredient, setList } = useIngredientsList();

  useEffect(() => {
    isItemsLoaded && setList(items, ingredients);
  }, [isItemsLoaded])

  return (
    <ul className={styles.list}>
      {lastIngredient && <li className={styles.last}>
                            <img src={lastIngredient.image} alt={lastIngredient.name} />
                            <span className={styles.lastValue}>+{lastIngredient.length}</span>
                         </li>}
      {firstIngredients && firstIngredients.map((ingredient, index) => {
        return (
          <li key={index}>
            <img src={ingredient.image} alt={ingredient.name} />
          </li>
        )
      })}
    </ul>
  );
};
