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
      const item = {
        ...action.payload,
        uid: action.payload._id + Math.random(),
      };

      if (item.type === 'bun') {
        state.selectedItems.bun = item;
      } else {
        state.selectedItems.items.push(item);
      }
    },
    deleteSelectedItem(state, action) {
      state.selectedItems.items = action.payload.items.filter(item => item.uid !== action.payload.uid);
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
        return action.payload.type === 'bun' && item._id === action.payload.id
          ? {...item, quantity: 1}
          : action.payload.type === 'bun' && item._id !== action.payload.id
          ? {...item, quantity: 0}
          : item._id === action.payload.id
          ? {...item, quantity: item.quantity + 1}
          : item;
      });
    },
    decreaseQuantity(state, action) {
      state.items = state.items.map(item => {
        return item._id === action.payload
          ? {...item, quantity: item.quantity > 0 ? item.quantity - 1 : 0}
          : item;
      });
    },
    resetQuantity(state, action) {
      state.items = state.items.map(item => {
        return item._id === action.payload
          ? {...item, quantity: 0}
          : item;
      });
      console.log('reset')
    },
    dropIngredient(state, action) {
      console.log(action.payload)
    },
  },
  extraReducers: {
    [getIngredients.pending]: (state) => {
      state.itemsRequest = true;
    },
    [getIngredients.fulfilled]: (state, action) => {
      state.items = action.payload.data.map(item => ({
        ...item,
        quantity: 0,
        uid: null,
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
  deleteSelectedItem,
  resetSelectedItems,
  setTotalPrice,
  resetTotalPrice,
  setIngredientDetails,
  resetIngredientDetails,
  addQuantity,
  decreaseQuantity,
  resetQuantity,
  dropIngredient,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;