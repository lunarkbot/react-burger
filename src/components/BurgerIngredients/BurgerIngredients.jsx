import React, {useEffect, useRef} from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import IngredientList from '../IngredientList/IngredientList';
import {useDispatch} from 'react-redux';
import {getIngredients} from '../../services/ingredientsSlice';

export default function BurgerIngredients() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

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
    </>
  )
}