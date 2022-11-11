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
    isItemsLoaded: false,

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
    resetSelectedItem(state) {
      state.selectedItems.items = [];
      state.selectedItems.bun = null;
      state.items.forEach(item => {
        item.quantity = 0;
      });
    },
    updateSelectedList(state, action) {
      state.selectedItems.items = action.payload;
    },
    deleteSelectedItem(state, action) {
      state.selectedItems.items = action.payload.items.filter(item => item.uid !== action.payload.uid);
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
    getIngredientsDetails(state, action) {
      const filteredItem = state.items.filter(item => {
        if (item._id === action.payload) return item;
      });

      state.ingredientDetails = filteredItem.length > 0 ? filteredItem[0] : null;
    },
    resetIngredientDetails(state) {
      state.ingredientDetails = null;
    },
    addQuantity(state, action) {
      state.items = state.items.map(item => {
        return action.payload.type === 'bun' && item._id === action.payload.id
          ? {...item, quantity: 1}
          : item.type === 'bun' && action.payload.type === 'bun' && item._id !== action.payload.id
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
  },
  extraReducers: {
    [getIngredients.pending]: (state) => {
      state.itemsRequest = true;
      state.isItemsLoaded = false;
    },
    [getIngredients.fulfilled]: (state, action) => {
      state.items = action.payload.data.map(item => ({
        ...item,
        quantity: 0,
        uid: null,
      }));
      state.itemsFailed = false;
      state.itemsRequest = false;
      state.isItemsLoaded = true;
    },
    [getIngredients.rejected]: (state, action) => {
      state.itemsFailed = true;
      state.itemsRequest = false;
      state.isItemsLoaded = false;
      consoleError(action.payload)
    },
  }
})

export const {
  addSelectedItem,
  deleteSelectedItem,
  updateSelectedList,
  setTotalPrice,
  resetTotalPrice,
  setIngredientDetails,
  getIngredientsDetails,
  resetIngredientDetails,
  addQuantity,
  decreaseQuantity,
  resetSelectedItem,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;