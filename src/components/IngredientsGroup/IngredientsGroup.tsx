import {FC} from 'react';
import styles from './IngredientsGroup.module.css';

export const IngredientsGroup: FC = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.last}>
        <span className={styles.lastValue}>+3</span>
      </li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  );
};
