import React from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from './IngredientList.module.css';
import {FoodDataContext} from '../../contexts/foodDataContext';

export default function IngredientList(props) {
  const foodData = React.useContext(FoodDataContext);

  return(
     <ul className={`${styles.list} mb-10`}>
       {foodData.map(item => {
         if (item.type === props.type) {
           return (
             <IngredientCard
               key={item._id}
               info={item}
               showIngredientDetail={props.showIngredientDetail}
             />
           )
         }
       })}
     </ul>
  )
}