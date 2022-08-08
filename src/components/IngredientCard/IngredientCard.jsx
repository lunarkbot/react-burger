import { useState} from 'react';
import styles from './IngredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function IngredientCard (props) {

  const {count, setCount} = useState(false)

  return(
    <li className={styles.card}>
      {count && <Counter count={0} size="default" />}
      <img className={styles.image} src={props.src} alt={props.text} />
      <div className={`${styles.price} text text_type_digits-default mb-1`}>
        {props.price}
        <CurrencyIcon type="primary" />
      </div>
      <div className={`${styles.text} text text_type_main-default`}>{props.text}</div>
    </li>
  );
}