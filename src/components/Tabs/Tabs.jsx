import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Tabs.module.css';
import PropTypes from 'prop-types';

export default function Tabs({handleClickTabs}) {
  const [current, setCurrent] = useState('one')

  return(
    <div className={`mb-10 ${styles.tabs}`}>
      <div onClick={() => handleClickTabs('bun')}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
        </Tab>
      </div>
      <div onClick={() => handleClickTabs('sauce')}>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
      </div>
      <div onClick={() => handleClickTabs('main')}>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    </div>
  )
}

Tabs.propTypes = {
  handleClickTabs: PropTypes.func.isRequired,
}