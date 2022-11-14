import {FC, useEffect} from 'react';
import styles from './IngredientsGroup.module.css';
import {useIngredientsList} from '../../hooks/useIngredientsList';
import {TIngredientById} from '../../types';

type TIngredientsGroup = {
  ingredients: string[];
  ingredientsById: TIngredientById,
}

export const IngredientsGroup: FC<TIngredientsGroup> = ({
                                                          ingredients = [],
                                                          ingredientsById
                                                        }) => {

  const { firstIngredients, lastIngredient, setList } = useIngredientsList();

  useEffect(() => {
    setList(ingredients, ingredientsById);
  }, [ingredientsById])

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
