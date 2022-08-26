import React, {useEffect, useState} from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import IngredientList from '../IngredientList/IngredientList';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import {useDispatch, useSelector} from 'react-redux';
import {addSelectedItem, getIngredients} from '../../store/ingredientsSlice';

export default function BurgerIngredients() {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredients.items);

  useEffect(() => {
    dispatch(getIngredients())
  },[dispatch])

  useEffect(() => {
    dispatch(addSelectedItem(ingredients[0]));
  }, [ingredients])

  const [selectedIngredient, setSelectedIngredient] = useState({
    isPopupVisible: false,
    value: false
  })

  const showIngredientDetail = (info) => {
    setSelectedIngredient({
      value: info,
      isPopupVisible: true
    })
  }

  const handleClickClose = () => {
    setSelectedIngredient({
      ...selectedIngredient,
      isPopupVisible: false
    })
  }

  return(
    <>
      <section>
        <Tabs />
        <div className={styles.scrollBox}>
          <div className="text text_type_main-medium mb-6">Булки</div>
          <IngredientList
            showIngredientDetail={showIngredientDetail}
            type="bun" />
          <div className="text text_type_main-medium mb-6">Соусы</div>
          <IngredientList
            showIngredientDetail={showIngredientDetail}
            type="sauce" />
          <div className="text text_type_main-medium mb-6">Начинки</div>
          <IngredientList
            showIngredientDetail={showIngredientDetail}
            type="main" />
        </div>
      </section>

      {selectedIngredient.isPopupVisible &&
        <Modal heading="Детали ингредиента" onClose={handleClickClose}>
          <IngredientDetails ingredientInfo={selectedIngredient.value} />
        </Modal>
      }
    </>
  )
}