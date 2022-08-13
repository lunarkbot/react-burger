import React from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import IngredientList from '../IngredientList/IngredientList';

export default function BurgerIngredients(props) {

  return(
    <section>
      <Tabs />
      <div className={styles.scrollBox}>
        <div className="text text_type_main-medium mb-6">Булки</div>
        <IngredientList type="bun" />
        <div className="text text_type_main-medium mb-6">Соусы</div>
        <IngredientList type="sauce" />
        <div className="text text_type_main-medium mb-6">Начинки</div>
        <IngredientList type="main" />
      </div>
    </section>
  )
}