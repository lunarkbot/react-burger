import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

export default function Tabs() {
  const [current, setCurrent] = useState('one')

  return(
    <div style={{ display: 'flex' }} className="mb-10">
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}