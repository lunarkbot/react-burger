import {useState} from 'react';
import {IIngredient, TIngredientById} from '../types';

export function useIngredientsById() {
  const [ingredientsById, setIngredientsListById] = useState<TIngredientById | null>(null);

  function setIngredients(ingredients: IIngredient[]) {
    const list: TIngredientById = {} as TIngredientById;

    ingredients.forEach((item: IIngredient) => {
      list[item._id] = item;
    })

    setIngredientsListById(list);
  }


  return { ingredientsById, setIngredients };
}
