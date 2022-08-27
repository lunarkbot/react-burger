import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {


  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
        <div className={styles.twoColumns}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients />
            <BurgerConstructor />
          </DndProvider>
        </div>
      </main>
    </>
  );
}

export default App;
