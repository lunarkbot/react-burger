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
  },
  reducers: {
    addSelectedItem: (state, action) => {

    },
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

export default ingredientsSlice.reducer;