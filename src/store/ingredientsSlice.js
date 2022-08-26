import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import consoleError from '../utils/consoleError';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  function(_, {rejectWithValue}) {
      return api.getIngredients()
        .then(data => data)
        .catch(err => rejectWithValue(err));
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    items: [],
    itemsRequest: false,
    itemsFailed: false,

    selectedItems: {
      items: [],
      bun: null
    },

    totalPrice: 0,
  },
  reducers: {
    addSelectedItem(state, action) {
      if (!action.payload) return;

      if (action.payload.type === 'bun') {
        state.selectedItems.bun = action.payload;
      } else {
        state.selectedItems.items.push(action.payload);
      }
    },
    resetSelectedItems(state) {
      state.selectedItems.bun = null;
      state.selectedItems.items = [];
    },
    setTotalPrice(state) {
      let totalPrice = state.totalPrice;
      state.selectedItems.items.forEach(item => {
        totalPrice += item.price;
      })
      totalPrice += state.selectedItems.bun ? state.selectedItems.bun.price * 2 : 0;

      state.totalPrice = totalPrice;
    },
    resetTotalPrice(state) {
      state.totalPrice = 0;
    }
  },
  extraReducers: {
    [getIngredients.pending]: (state) => {
      state.itemsRequest = true;
    },
    [getIngredients.fulfilled]: (state, action) => {
      state.items = action.payload.data;
      state.itemsFailed = true;
      state.itemsRequest = false;
    },
    [getIngredients.rejected]: (state, action) => {
      state.itemsFailed = false;
      state.itemsRequest = false;
      consoleError(action.payload)
    },
  }
})

export const {
  addSelectedItem,
  resetSelectedItems,
  setTotalPrice,
  resetTotalPrice,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;