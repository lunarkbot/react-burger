import React from 'react';
import styles from './OrderDetails.module.css';
import Modal from '../Modal/Modal';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails(props) {
  return (
    <Modal onClose={props.onClose}>
      <p className="text text_type_digits-large mb-8">
        034536
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
    </Modal>
  );
}

export default OrderDetails;