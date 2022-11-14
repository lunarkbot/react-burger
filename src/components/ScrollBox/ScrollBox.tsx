import {FC} from 'react';
import styles from './ScrollBox.module.css';

type ScrollBox = {
  secondClass: string;
}

export const ScrollBox: FC<ScrollBox> = ({ secondClass, children }) => {
  return (
    <div className={`${styles.scrollBox} ${secondClass}`}>
      { children }
    </div>
  );
};
