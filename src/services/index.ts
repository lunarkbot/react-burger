import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import ordersReducer from './ordersSlice';
import tabsReducer from './tabsSlice';
import usersSlice from './usersSlice';
import errorsSlice from './errorsSlice';
import passwordSlice from './passwordSlice';
import {socketMiddleware} from '../middleware/socketMiddleware';
import wsFeedSlice, {wsFeedActions} from './wsFeedSlice';
import wsProfileSlice, {wsProfileActions} from './wsProfileSlice';

const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    tabs: tabsReducer,
    users: usersSlice,
    errors: errorsSlice,
    password: passwordSlice,
    wsFeed: wsFeedSlice,
    wsProfile: wsProfileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(socketMiddleware('wss://norma.nomoreparties.space/orders/all', wsFeedActions))
      .concat(socketMiddleware('wss://norma.nomoreparties.space/orders', wsProfileActions)),
})

export default store;
