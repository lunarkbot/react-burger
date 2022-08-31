import React from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from './IngredientList.module.css';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

export default function IngredientList({ type }) {
  const ingredients = useSelector(state => state.ingredients.items);

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

IngredientList.propTypes = {
  type: PropTypes.string.isRequired,
}
