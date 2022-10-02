import React, {FC} from 'react';
import styles from './IngredientCard.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {setIngredientDetails} from '../../services/ingredientsSlice';
import {useDrag} from 'react-dnd';
import {Link, useLocation} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';

type TIngredientCardProps = {
  item: IIngredientsItem;
}

const IngredientCard: FC<TIngredientCardProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const ingredientId = item['_id'];

  const handleClick = () => {
    dispatch(setIngredientDetails(item))
  }

  const [{opacity},dragRef] = useDrag({
    type: item.type,
    item: {
      id: item._id,
      type: item.type,
      item
    },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.2 : 1
    })
  })

  return(
    <li onClick={handleClick} ref={dragRef} style={{opacity}}>
      <Link
        key={ingredientId}
        to={{
          pathname: `/ingredients/${ingredientId}`,
          state: { background: location },
        }}
        className={styles.card}
      >
        {item.quantity !== 0 && <Counter count={item.quantity} size="default" />}
        <img className={styles.image} src={item.image} alt={item.name} />
        <div className={`${styles.price} text text_type_digits-default mb-1`}>
          {item.price}
          <CurrencyIcon type="primary" />
        </div>
        <div className={`${styles.text} text text_type_main-default`}>{item.name}</div>
      </Link>
    </li>
  );
}

export default IngredientCard;
