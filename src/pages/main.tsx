import React, {FC} from 'react';
import styles from './main.module.css'
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';

export const MainPage: FC = () => {
  return (
    <main className={styles.main}>
      <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
      <div className={styles.twoColumns}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </main>
  );
}
