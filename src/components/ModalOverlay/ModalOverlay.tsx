import React, {FC, MouseEventHandler} from 'react';
import styles from './ModalOverlay.module.css'

interface IModalOverlayProps {
  onClose: Function;
}

const ModalOverlay: FC<IModalOverlayProps> = ({onClose, children}) => {
  const handleClick = (e: any) => {
    if (e.target.id === 'popup') onClose();
  }

  return (
    <div className={styles.overlay} id="popup" onClick={handleClick}>{children}</div>
  );
}

export default ModalOverlay;
