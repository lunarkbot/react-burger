import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import api from '../utils/api';
import consoleError from '../utils/consoleError';
import {IIngredient, IIngredientsItem, TSendOrder} from '../types';

type TOrder = {
  number: number;
  [key: string]: string | number | IIngredient[];
}

type TOrderDetails = {
  order: TOrder;
  [key: string]: string | number | boolean | TOrder;
}

type TOrdersSlice = {
  orderDetail: null | TOrderDetails;
  orderDetailRequest: boolean;
  orderDetailFailed: boolean;
  isOrderDetailsShow: boolean;
}

export const sendOrder = createAsyncThunk(
  'orders/sendOrder',
  async function (data: TSendOrder, {rejectWithValue}) {
     try {
       console.log(data)
       return await api.sendOrder(data)
     } catch(err) {
       return rejectWithValue(err);
     }
  }
);

const initialState: TOrdersSlice = {
  orderDetail: null,
  orderDetailRequest: false,
  orderDetailFailed: false,
  isOrderDetailsShow: false
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    hideOrderDetails(state) {
      state.isOrderDetailsShow = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendOrder.pending, (state) => {
      state.orderDetailRequest = true;
    })
    builder.addCase(sendOrder.fulfilled, (state, action: PayloadAction<any>) => {
      state.orderDetail = action.payload;
      console.log(action.payload)
      state.orderDetailFailed = false;
      state.orderDetailRequest = false;
      state.isOrderDetailsShow = true;
    })
    builder.addCase(sendOrder.rejected, (state, action: PayloadAction<any>) => {
      state.orderDetailFailed = true;
      state.orderDetailRequest = false;
      consoleError(action.payload)
    })
  }
})

export const { hideOrderDetails } = ordersSlice.actions;

export default ordersSlice.reducer;
