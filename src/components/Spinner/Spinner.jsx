import React from 'react';
import styles from './Spinner.module.css';
import PropTypes from 'prop-types';

function Spinner( { className = '' } ) {
  return (
    <div className={`${styles.spinner} ${className}`}>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;

Spinner.propTypes = {
  className: PropTypes.string,
}