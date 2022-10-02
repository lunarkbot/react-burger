import React, {FC, useEffect} from 'react';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModalProps {
  type?: string;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({type, onClose, children}) => {

  useEffect(() => {
    function closeByEscape(evt: {key: string}) {
      if(evt.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeByEscape);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
    }
  }, [])

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={`
          ${styles.modal}
          ${type === 'ingredient' ? 'pt-10 pb-15' : 'pt-30 pb-30'} 
        `}>
        <button className={`${styles.button} mt-15 mr-10`} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>

          {children}

      </div>
    </ModalOverlay>,
    modalRoot
  );
}

export default Modal;
