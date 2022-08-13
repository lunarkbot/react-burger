import React from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById("react-modals");

export default function Modal({heading, onClose, children}) {

  const handleEscPress = (evt) => {
    if (evt.key === 'Escape') onClose();
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    }
  }, [])

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={`
          ${styles.modal}
          ${heading ? 'pt-10 pb-15' : 'pt-30 pb-30'} 
        `}>
        <button className={`${styles.button} mt-15 mr-10`} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {heading && <p className={`text text_type_main-large pt-3 pb-3 pl-10 pr-10 ${styles.heading}`}>
          {heading}
        </p>}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
}

Modal.propTypes = {
  heading: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
}
