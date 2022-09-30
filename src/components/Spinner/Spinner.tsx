import React, {FC} from 'react';
import styles from './Spinner.module.css';

interface ISpinnerProps {
  className?: string;
}

const Spinner: FC<ISpinnerProps> = ( { className = '' } ) => {
  return (
    <div className={`${styles.spinner} ${className}`}>
      <div></div>
      <div></div>
    </div>
  );
}

export default Spinner;
