import React, {FC} from 'react';
import styles from './ModalOverlay.module.css'

interface IModalOverlayProps {
  onClose: () => void;
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
