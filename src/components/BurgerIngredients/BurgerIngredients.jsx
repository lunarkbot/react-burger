import React from 'react';
import styles from './BurgerIngredients.module.css';
import Tabs from '../Tabs/Tabs';
import IngredientList from '../IngredientList/IngredientList';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

export default function BurgerIngredients(props) {
  const [selectedIngredient, setSelectedIngredient] = React.useState({
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
        <IngredientDetails
          ingredientInfo={selectedIngredient.value}
          onClose={handleClickClose} />}
    </>
  )
}