import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import ordersReducer from './ordersSlice';
import tabsReducer from './tabsSlice';
import usersSlice from './usersSlice';
import errorsSlice from './errorsSlice';
import passwordSlice from './passwordSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    tabs: tabsReducer,
    users: usersSlice,
    errors: errorsSlice,
    password: passwordSlice,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
