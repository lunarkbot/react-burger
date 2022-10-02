import React from 'react';
import Spinner from '../Spinner/Spinner';
import styles from './BigSpinner.module.css';

function BigSpinner() {
  return (
    <div className={styles.spinnerWrap}>
      <Spinner className={ styles.spinner } />
    </div>
  );
}

export default BigSpinner;
