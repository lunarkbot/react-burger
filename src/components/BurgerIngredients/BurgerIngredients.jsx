import React, {useEffect, useRef} from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import IngredientList from '../IngredientList/IngredientList';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import {useDispatch, useSelector} from 'react-redux';
import {addSelectedItem, getIngredients, resetIngredientDetails} from '../../services/ingredientsSlice';

export default function BurgerIngredients() {
  const dispatch = useDispatch();
  const { ingredients, ingredientDetails } = useSelector(state => ({
    ingredients: state.ingredients.items,
    ingredientDetails: state.ingredients.ingredientDetails,
  }));

  const tabRefs = {
    bun: useRef(),
    sauce: useRef(),
    main: useRef()
  }


  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

  useEffect(() => {
    dispatch(addSelectedItem(ingredients[0]));
  }, [ingredients])

  const handleClickClose = () => {
    dispatch(resetIngredientDetails())
  }

  const handleClickTabs = (tabName) => {
    tabRefs[tabName].current.scrollIntoView({block: "start", behavior: "smooth"});
  }

  return(
    <>
      <section>
        <Tabs handleClickTabs={handleClickTabs} />
        <div className={styles.scrollBox}>
          <div className="text text_type_main-medium mb-6" ref={tabRefs.bun}>Булки</div>
          <IngredientList
            type="bun" />
          <div className="text text_type_main-medium mb-6" ref={tabRefs.sauce}>Соусы</div>
          <IngredientList
            type="sauce" />
          <div className="text text_type_main-medium mb-6" ref={tabRefs.main}>Начинки</div>
          <IngredientList
            type="main" />
        </div>
      </section>

      {ingredientDetails &&
        <Modal heading="Детали ингредиента" onClose={handleClickClose}>
          <IngredientDetails />
        </Modal>
      }
    </>
  )
}