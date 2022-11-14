import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import ordersReducer from './ordersSlice';
import tabsReducer from './tabsSlice';
import usersSlice from './usersSlice';
import errorsSlice from './errorsSlice';
import passwordSlice from './passwordSlice';
import {socketMiddleware} from '../middleware/socketMiddleware';
import wsMiddlewareSlice, {wsMiddlewareActions} from './wsMiddlewareSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    tabs: tabsReducer,
    users: usersSlice,
    errors: errorsSlice,
    password: passwordSlice,
    wsMiddleware: wsMiddlewareSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(socketMiddleware('wss://norma.nomoreparties.space/orders', wsMiddlewareActions))
})

export default store;
