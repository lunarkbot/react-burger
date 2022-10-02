import React, {FC} from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from './IngredientList.module.css';
import {useAppSelector} from '../../hooks';

type TIngredientListProps = {
  type: string;
}

const IngredientList: FC<TIngredientListProps> = ({ type }) => {
  const ingredients: IIngredientsItem[] = useAppSelector(state => state.ingredients.items);

  return(
     <ul className={`${styles.list} mb-10`}>
       {ingredients.map(item => {
         if (item.type === type) {
           return (
             <IngredientCard
               key={item._id}
               item={item}
             />
           )
         }
       })}
     </ul>
  )
}

export default IngredientList;
