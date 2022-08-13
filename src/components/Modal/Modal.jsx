import React from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("react-modals");

function Modal(props) {

  return ReactDOM.createPortal(
    <ModalOverlay onClose={props.onClose}>
      <div className={`
          ${styles.modal}
          ${props.heading ? 'pt-10 pb-15' : 'pt-30 pb-30'} 
        `}>
        <button className={`${styles.button} mt-15 mr-10`} onClick={props.onClose}>
          <CloseIcon type="primary" />
        </button>
        {props.heading && <p className={`text text_type_main-large pt-3 pb-3 pl-10 pr-10 ${styles.heading}`}>
          {props.heading}
        </p>}
        <div className={styles.content}>
          {props.children}
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

export default Modal;