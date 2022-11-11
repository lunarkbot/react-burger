import { createSlice } from '@reduxjs/toolkit';

const wsOrdersSlice = createSlice({
  name: 'wsOrders',
  initialState: {
    isConnectionEstablished: false,
  },
  reducers: {
    wsInit() {
      console.log('Попытка подключения...');
    },
    wsClose() {
      console.log('Подключение закрыто браузером.');
    },
    wsSendMessage() {

    },
    onOpen() {

    },
    onClose() {

    },
    onError() {

    },
    onMessage() {

    }
  }
});

export const {
  wsInit,
  wsClose,
  wsSendMessage,
  onOpen,
  onClose,
  onError,
  onMessage,
} = wsOrdersSlice.actions;

export const wsOrdersActions = wsOrdersSlice.actions;

export default wsOrdersSlice.reducer;
