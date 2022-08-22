import React from 'react';
import styles from './Bun.module.css';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import {ingredientsTypes} from '../../utils/constants';

function Bun({ item, type }) {
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

Bun.propTypes = {
  item: PropTypes.shape(ingredientsTypes).isRequired,
  type: PropTypes.string.isRequired
}