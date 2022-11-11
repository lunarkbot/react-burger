import styles from './ConstructorItem.module.css';
import React, {FC, useRef} from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {decreaseQuantity, deleteSelectedItem} from '../../services/ingredientsSlice';
import {useDrag, useDrop} from 'react-dnd';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {IIngredientsItem} from '../../types';

type TConstructorItemProps = {
  item: IIngredientsItem;
  index: number;
  moveCard: Function;
}

const ConstructorItem: FC<TConstructorItemProps> = ({ item, index, moveCard }) => {
  const dispatch = useAppDispatch();
  const selectedIngredients = useAppSelector(state => state.ingredients.selectedItems.items);

  function handleClose() {
    dispatch(deleteSelectedItem({
      uid: item.uid,
      items: selectedIngredients
    }));
    dispatch(decreaseQuantity(item._id));
  }

  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset?.y ? clientOffset.y - hoverBoundingRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })

  const [{ opacity }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  if (item.type !== 'bun') drag(drop(ref));
  const preventDefault = (e: any) => e.preventDefault();

  return (
    <li
      className={styles.listItem}
      ref={ref}
      style={{ opacity }}
      onDrop={preventDefault}
      data-handler-id={handlerId}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={handleClose}
      />
    </li>
  );
}

export default ConstructorItem;
