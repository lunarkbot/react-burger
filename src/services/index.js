import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import ordersReducer from './ordersSlice';

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    orders: ordersReducer
  }
})