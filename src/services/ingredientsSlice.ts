import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import api from '../utils/api';
import consoleError from '../utils/consoleError';
import {IIngredient, IIngredientsItem} from '../types';

type TOrder = {
  number: number;
  [key: string]: string | number | IIngredient[];
}

type TIngredientDetails = {
  order: TOrder;
  [key: string]: string | number | boolean | TOrder;
}

type TIngredientsSlice = {
  items: [] | IIngredientsItem[];
  itemsRequest: boolean;
  itemsFailed: boolean;
  isItemsLoaded: boolean;

  selectedItems: {
    items: IIngredientsItem[];
    bun: IIngredientsItem | null;
  }

  totalPrice: number;
  ingredientDetails: null | IIngredientsItem;
}

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  function(_, {rejectWithValue}) {
      return api.getIngredients()
        .catch(err => rejectWithValue(err));
  }
);

const initialState: TIngredientsSlice = {
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
}

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addSelectedItem(state, action: PayloadAction<IIngredientsItem>) {
      if (!action.payload) return;
      const item: IIngredientsItem = {
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
      state.selectedItems.items = action.payload.items.filter((item: IIngredientsItem) =>
        item.uid !== action.payload.uid);
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
  extraReducers: (builder) => {
    builder.addCase(getIngredients.pending, (state) => {
      state.itemsRequest = true;
      state.isItemsLoaded = false;
    })

    builder.addCase(getIngredients.fulfilled, (state, action: PayloadAction<any>) => {
      state.items = action.payload.data.map((item: IIngredientsItem) => ({
        ...item,
        quantity: 0,
        uid: null,
      }));
      state.itemsFailed = false;
      state.itemsRequest = false;
      state.isItemsLoaded = true;
    })

    builder.addCase(getIngredients.rejected, (state, action: PayloadAction<any>) => {
      state.itemsFailed = true;
      state.itemsRequest = false;
      state.isItemsLoaded = false;
      consoleError(action.payload)
    })
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