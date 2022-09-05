import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import ordersReducer from './ordersSlice';
import tabsReducer from './tabsSlice';
import usersSlice from './usersSlice';
import errorsSlice from './errorsSlice';

export default configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    tabs: tabsReducer,
    users: usersSlice,
    errors: errorsSlice,
  }
})