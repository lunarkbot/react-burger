import React from 'react';
import styles from './OrderDetails.module.css';
import PropTypes from 'prop-types';

export default function OrderDetails({ details }) {
  return (
    <div className={styles.content}>
      <p className="text text_type_digits-large mb-8">
        {details?.order?.number}
      </p>
      <p className="text text_type_main-medium mb-15">
        идентификатор заказа
      </p>
      <div className={`${styles.done} mb-15`}></div>
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  details: PropTypes.shape({
    name: PropTypes.string.isRequired,
    order: PropTypes.object.isRequired,
  }).isRequired,
}