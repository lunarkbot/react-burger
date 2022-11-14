import React, {FC, RefObject, useEffect, useRef} from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import IngredientList from '../IngredientList/IngredientList';
import {getIngredients} from '../../services/ingredientsSlice';
import {useAppDispatch} from '../../hooks';

interface ITabsRef {
  [key: string]: RefObject<HTMLDivElement>;
}

const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

  const tabsRef: ITabsRef = {
    bun: useRef<HTMLDivElement>(null),
    sauce: useRef<HTMLDivElement>(null),
    main: useRef<HTMLDivElement>(null),
  }

  const scrollBoxRef = useRef<HTMLDivElement>(null);

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

export default BurgerIngredients;
