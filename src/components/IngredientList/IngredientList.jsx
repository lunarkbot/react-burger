import React from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from './IngredientList.module.css';
import { data } from '../../utils/data';

export default function IngredientList(props) {
  console.log(data)
  return(
     <ul className={`${styles.list} mb-10`}>
       {data.map(item => {
         if (item.type === props.type) {
           return (
             <IngredientCard
               key={item._id}
               src={item.image}
               text={item.name}
               price={item.price}
             />
           )
         }
       })}
     </ul>
  )
}