import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import consoleError from '../utils/consoleError';

export const sendOrder = createAsyncThunk(
  'orders/sendOrder',
  function (data, {rejectWithValue}) {
    return api.sendOrder(data.ingredients)
      .catch(err => {
        rejectWithValue(err);
      })
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orderDetail: null,
    orderDetailRequest: false,
    orderDetailFailed: false,
    isOrderDetailsShow: false
  },
  reducers: {
    hideOrderDetails(state) {
      state.isOrderDetailsShow = false;
    }
  },
  extraReducers: {
    [sendOrder.pending]: (state) => {
      state.orderDetailRequest = true;
    },
    [sendOrder.fulfilled]: (state, action) => {
      state.orderDetail = action.payload;
      state.orderDetailFailed = false;
      state.orderDetailRequest = false;
      state.isOrderDetailsShow = true;
    },
    [sendOrder.rejected]: (state, action) => {
      state.orderDetailFailed = true;
      state.orderDetailRequest = false;
      consoleError(action.payload)
    }
  }
})

export const { hideOrderDetails } = ordersSlice.actions;

export default ordersSlice.reducer;