import React from 'react';
import styles from './App.module.css';
import {FoodDataContext} from '../../contexts/foodDataContext';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Api from '../../utils/api';


function App() {

  const [foodData, setFoodData] = React.useState(null);

  React.useEffect(() => {
    Api.getIngredients()
      .then(res => setFoodData(res.data))
      .catch(err => console.log(err));
  }, [])

  return (
    <>
      <AppHeader />
      <FoodDataContext.Provider value={foodData}>
        <main className={styles.main}>
          <h1 className="mb-5 text text_type_main-large">Соберите бургер</h1>
          <div className={styles.twoColumns}>
            {foodData && (
              <>
                <BurgerIngredients />
                <BurgerConstructor />
              </>
            )}
          </div>
        </main>
      </FoodDataContext.Provider>
    </>
  );
}

export default App;
