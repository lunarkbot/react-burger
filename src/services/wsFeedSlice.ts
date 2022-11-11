import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TOrdersResult} from '../types';

type TWsFeed = {
  isConnected: boolean;
  orders: null | TOrdersResult[];
  total: null | number;
  totalToday: null | number;
}

const initialState: TWsFeed = {
  isConnected: false,
  orders: null,
  total: null,
  totalToday: null,
}

const wsFeedSlice = createSlice({
  name: 'wsFeed',
  initialState,
  reducers: {
    wsInit(_, action: PayloadAction<string>) {
      console.log('Попытка подключения...');
    },
    wsClose(state, action: PayloadAction<string>) {
      state.isConnected = false;
      console.log('Подключение закрыто браузером.');
    },
    onOpen(state) {
      state.isConnected = true;
      console.log('Подключение установлено.');
    },
    onClose(state) {
      state.isConnected = false;
      console.log('Подключение завершено сервером.');
    },
    onError(state) {
      state.isConnected = false;
      console.log('Произошла ошибка подключения.')
    },
    onMessage(state, action: PayloadAction<any>) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    }
  }
});

export const {
  wsInit,
  wsClose,
} = wsFeedSlice.actions;

export const wsFeedActions = wsFeedSlice.actions;

export default wsFeedSlice.reducer;
