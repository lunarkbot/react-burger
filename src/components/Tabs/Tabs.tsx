import React, {FC, RefObject, useEffect} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Tabs.module.css';
import {setCurrentTab, setVisibility} from '../../services/tabsSlice';
import {useAppDispatch, useAppSelector} from '../../hooks';

interface ITabsRef {
  [key: string]: RefObject<HTMLDivElement>;
}

interface ITabsProps {
  tabsRef: ITabsRef;
  scrollBoxRef: RefObject<HTMLDivElement>;
}

type TIsTabVisible = {
  [key: string]: boolean;
}

const Tabs: FC<ITabsProps> = ({tabsRef, scrollBoxRef }) => {
  const dispatch = useAppDispatch();
  const current = useAppSelector(state => state.tabs.currentTab);
  const isTabVisible: TIsTabVisible = useAppSelector(state => state.tabs.isVisible);

  const handleClick = (tabName: string) => {
    tabsRef[tabName].current?.scrollIntoView({block: "start", behavior: "smooth"});
  }

  useEffect(() => {
    for (let key in isTabVisible) {
      if (isTabVisible[key]) {
        dispatch(setCurrentTab(key));
        break;
      }
    }
  }, [isTabVisible])

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      for (let entry of entries) {
        const { target, boundingClientRect, rootBounds } = entry;

        if (target.id && rootBounds) {
          const top = boundingClientRect.top-rootBounds.top;

          dispatch(setVisibility({
            name: target.id,
            value: top < rootBounds.height && top >= 0,
          }));
        }
      }
    }

    const observer = new IntersectionObserver(observerCallback, {
      root: scrollBoxRef.current,
      rootMargin: '0px',
      threshold: 1
    })

    for (let key in tabsRef) {
      observer.observe(tabsRef[key].current as HTMLDivElement)
    }

  }, [scrollBoxRef, tabsRef])

  return(
    <div className={`mb-10 ${styles.tabs}`}>
      <div onClick={() => handleClick('bun')}>
        <Tab value="bun" active={current === 'bun'} onClick={handleClick}>
        Булки
        </Tab>
      </div>
      <div onClick={() => handleClick('sauce')}>
        <Tab value="sauce" active={current === 'sauce'} onClick={handleClick}>
          Соусы
        </Tab>
      </div>
      <div onClick={() => handleClick('main')}>
        <Tab value="main" active={current === 'main'} onClick={handleClick}>
          Начинки
        </Tab>
      </div>
    </div>
  )
}

export default Tabs;
