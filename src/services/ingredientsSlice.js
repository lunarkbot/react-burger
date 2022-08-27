import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';
import consoleError from '../utils/consoleError';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  function(_, {rejectWithValue}) {
      return api.getIngredients()
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

    ingredientDetails: null,
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
    },
    setIngredientDetails(state, action) {
      state.ingredientDetails = action.payload;
    },
    resetIngredientDetails(state) {
      state.ingredientDetails = null;
    },
    addQuantity(state, action) {
      state.items = state.items.map(item => {
        return item._id === action.payload
          ? {...item, quantity: item.quantity + 1}
          : item;
      });
    },
    resetQuantity(state, action) {
      state.items = state.items.map(item => {
        return item._id === action.payload
          ? {...item, quantity: 0}
          : item;
      });
    }
  },
  extraReducers: {
    [getIngredients.pending]: (state) => {
      state.itemsRequest = true;
    },
    [getIngredients.fulfilled]: (state, action) => {
      state.items = action.payload.data.map(item => ({
        ...item,
        quantity: 0
      }));
      state.itemsFailed = false;
      state.itemsRequest = false;
    },
    [getIngredients.rejected]: (state, action) => {
      state.itemsFailed = true;
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
  setIngredientDetails,
  resetIngredientDetails,
  addQuantity,
  resetQuantity,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;