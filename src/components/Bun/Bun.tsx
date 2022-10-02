import React, {FC} from 'react';
import styles from './Bun.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';

interface IBunProps {
  item: {
    name: string;
    price: number;
    image: string;
  };
  type: 'top' | 'bottom';
}

const Bun: FC<IBunProps> = ({ item, type }) => {
  return (
    <div className={`${styles.edgeElement} pl-8`}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={`${item?.name} (${type === 'bottom' ? 'низ' : 'верх'})`}
        price={item?.price}
        thumbnail={item?.image}
      />
    </div>
  );
}

export default Bun;
