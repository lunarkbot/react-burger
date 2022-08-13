import React from 'react';
import styles from './ModalOverlay.module.css'

function ModalOverlay(props) {
  const handleClick = (e) => {
    if (e.target.id === 'popup') props.onClose();
  }

  return (
    <>
      <div className={styles.overlay} id="popup" onClick={handleClick}>{props.children}</div>
    </>
  );
}

export default ModalOverlay;