import React, {FC, RefObject, useRef} from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import IngredientList from '../IngredientList/IngredientList';

interface ITabsRef {
  [key: string]: RefObject<HTMLDivElement>;
}

const BurgerIngredients: FC = () => {

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
