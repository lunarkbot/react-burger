import React from 'react';
import IngredientCard from '../IngredientCard/IngredientCard';
import styles from './IngredientList.module.css';
import {FoodDataContext} from '../../contexts/foodDataContext';
import PropTypes from 'prop-types';

export default function IngredientList({type, showIngredientDetail}) {
  const foodData = React.useContext(FoodDataContext);

  return(
     <ul className={`${styles.list} mb-10`}>
       {foodData.map(item => {
         if (item.type === type) {
           return (
             <IngredientCard
               key={item._id}
               info={item}
               showIngredientDetail={showIngredientDetail}
             />
           )
         }
       })}
     </ul>
  )
}

IngredientList.propTypes = {
  showIngredientDetail: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}
