import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TOrdersResult} from '../types';

type TWsMiddleware = {
  isConnected: boolean;
  orders: null | TOrdersResult[];
  total: null | number;
  totalToday: null | number;
}

type TWsMiddlewarePayload = {
  orders: null | TOrdersResult[];
  total?: null | number;
  totalToday?: null | number;
}

const initialState: TWsMiddleware = {
  isConnected: false,
  orders: null,
  total: null,
  totalToday: null,
}

const wsMiddlewareSlice = createSlice({
  name: 'wsMiddleware',
  initialState,
  reducers: {
    wsInit(_, action: PayloadAction<string>) {
      console.log('Попытка подключения...');
    },
    wsClose(state, action: PayloadAction<string>) {
      state.isConnected = false;
    },
    onOpen(state) {
      state.isConnected = true;
    },
    onClose(state) {
      state.isConnected = false;
    },
    onError() {
      wsMiddlewareSlice.actions.resetState();
    },
    onMessage(state, action: PayloadAction<TWsMiddlewarePayload>) {
      state.orders = action.payload.orders;
      if (action.payload.total && action.payload.totalToday) {
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      }
    },
    resetState(state) {
      state.orders = null;
      state.totalToday = null;
      state.total = null;
      state.isConnected = false;
    }
  }
});

export const {
  wsInit,
  wsClose,
  onOpen,
  onClose,
  onMessage,
  resetState
} = wsMiddlewareSlice.actions;

export const wsMiddlewareActions = wsMiddlewareSlice.actions;

export default wsMiddlewareSlice.reducer;
