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

  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

  const handleClickClose = () => {
    dispatch(resetIngredientDetails())
  }

  const tabsRef = {
    bun: useRef(),
    sauce: useRef(),
    main: useRef(),
  }

  const scrollBoxRef = useRef();

  return(
    <>
      <section>
        <Tabs
          tabsRef={tabsRef}
          scrollBoxRef={scrollBoxRef}
        />
        <div className={styles.scrollBox} ref={scrollBoxRef}>
          <div id="bun" className="text text_type_main-medium mb-6" ref={tabsRef.bun}>Булки</div>
          <IngredientList
            type="bun" />
          <div id="sauce" className="text text_type_main-medium mb-6" ref={tabsRef.sauce}>Соусы</div>
          <IngredientList
            type="sauce" />
          <div id="main" className="text text_type_main-medium mb-6" ref={tabsRef.main}>Начинки</div>
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