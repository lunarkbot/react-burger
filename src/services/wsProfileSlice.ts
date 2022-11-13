import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TOrdersResult} from '../types';

type TWsProfile = {
  isConnected: boolean;
  orders: null | TOrdersResult[];
}

const initialState: TWsProfile = {
  isConnected: false,
  orders: null,
}

const wsProfileSlice = createSlice({
  name: 'wsProfile',
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
    }
  }
});

export const {
  wsInit,
  wsClose,
} = wsProfileSlice.actions;

export const wsProfileActions = wsProfileSlice.actions;

export default wsProfileSlice.reducer;
