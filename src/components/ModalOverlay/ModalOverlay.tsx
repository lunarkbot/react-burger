import React, {FC, SyntheticEvent} from 'react';
import styles from './ModalOverlay.module.css'

interface IModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({onClose, children}) => {
  const handleClick = (e: SyntheticEvent) => {
    const target = e.target as HTMLDivElement;
    if (target.id === 'popup') onClose();
  }

  return (
    <div className={styles.overlay} id="popup" onClick={handleClick}>{children}</div>
  );
}

export default ModalOverlay;
