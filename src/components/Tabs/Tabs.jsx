import React, {useEffect, useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Tabs.module.css';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {setCurrentTab, setVisibility} from '../../services/tabsSlice';

export default function Tabs({tabsRef, scrollBoxRef }) {
  const dispatch = useDispatch();
  const current = useSelector(state => state.tabs.currentTab);
  const isTabVisible = useSelector(state => state.tabs.isVisible);

  const handleClick = (tabName) => {
    tabsRef[tabName].current.scrollIntoView({block: "start", behavior: "smooth"});
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
    const observerCallback = (entries) => {
      for (let entry of entries) {
        const { target, boundingClientRect, rootBounds } = entry;

        if (target.id) {
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
      observer.observe(tabsRef[key].current)
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

Tabs.propTypes = {
  tabsRef: PropTypes.object.isRequired,
  scrollBoxRef: PropTypes.object.isRequired,
}