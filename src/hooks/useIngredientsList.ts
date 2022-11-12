import {useEffect, useState} from 'react';
import {IIngredient, TIngredientById} from '../types';
import {useIngredientsById} from './useIngredientsById';

type TIngredient = {
  image: string;
  length?: number;
  name: string;
}

export function useIngredientsList(ingredientsById: TIngredientById) {
  const [firstIngredientsId, setFirstIngredientsId] = useState<string[] | null>(null);
  const [lastIngredientsId, setLastIngredientsId] = useState<string[] | null>(null);
  const [firstIngredients, setFirstIngredients] = useState<TIngredient[] | null>(null);
  const [lastIngredient, setLastIngredient] = useState<TIngredient | null>(null);

  useEffect(() => {
    if (!ingredientsById) return;

    if (lastIngredientsId) {
      setLastIngredient({
        length: lastIngredientsId.length - 1,
        name: ingredientsById[lastIngredientsId[0]].name,
        image: ingredientsById[lastIngredientsId[0]].image_mobile,
      });
    }

    if (firstIngredientsId) {
      setFirstIngredients(
        firstIngredientsId.reduce((acc: TIngredient[], item) => {
          return [
            ...acc,
            {
              name: ingredientsById[item].name,
              image: ingredientsById[item].image_mobile,
            }
          ]
        }, [])
      )
    }

  }, [ingredientsById])

  function setList(items: string[]) {
    if (items.length > 6) {
      setFirstIngredientsId(items.slice(0,5));
      setLastIngredientsId(items.slice(5));
    } else {
      setFirstIngredientsId(items);
    }
  }

  return { firstIngredients, lastIngredient, setList };
}
