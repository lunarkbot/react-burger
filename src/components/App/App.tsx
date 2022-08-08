import React from 'react';
import styles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
        <div className={styles.twoColumns}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    </>
  );
}

export default App;