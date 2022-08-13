import React from 'react';
import styles from './ModalOverlay.module.css'
import PropTypes from 'prop-types';

export default function ModalOverlay({onClose, children}) {
  const handleClick = (e) => {
    if (e.target.id === 'popup') onClose();
  }

  return (
    <div className={styles.overlay} id="popup" onClick={handleClick}>{children}</div>
  );
}

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired
}
