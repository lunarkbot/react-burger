import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from './App.module.css';
import {addSelectedItem, getIngredients} from '../../store/ingredientsSlice';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredients.items);

  useEffect(() => {
    dispatch(addSelectedItem(ingredients[0]));
  }, [ingredients])


  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
        <div className={styles.twoColumns}>
          {ingredients.length && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
