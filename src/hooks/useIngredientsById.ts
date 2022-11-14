import {useState} from 'react';
import {IIngredient, IIngredientsItem, TIngredientById} from '../types';

export function useIngredientsById() {
  const [ingredientsById, setIngredientsListById] = useState<TIngredientById | null>(null);

  function setIngredients(ingredients: IIngredientsItem[]) {
    const list: TIngredientById = {} as TIngredientById;

    ingredients.forEach((item: IIngredientsItem) => {
      list[item._id] = item;
    })

    setIngredientsListById(list);
  }


  return { ingredientsById, setIngredients };
}
