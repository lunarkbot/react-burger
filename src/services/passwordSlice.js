import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../utils/api';
import consoleError from '../utils/consoleError';

export const forgotPassword = createAsyncThunk(
  'users/forgotPassword',
  async function (data, {rejectWithValue}) {
    try {
      return await api.forgotPassword(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async function (data, {rejectWithValue}) {
    try {
      return await api.resetPassword(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

const passwordSlice = createSlice({
  name: 'password',
  initialState: {
    isResetEmailSend: false,
    isPasswordReset: false,
    isButtonDisabled: false,
  },
  reducers: {
    resetPasswordData(state) {
      state.isReset = false;
      state.isResetEmailSend = false;
      state.isButtonDisabled = false;
    },
  },
  extraReducers: {
    [forgotPassword.pending]: (state) => {
      state.isResetEmailSend = false;
      state.isButtonDisabled = true;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.isResetEmailSend = true;
      } else {
        consoleError('Повторите попытку позже.');
      }
      state.isButtonDisabled = false;
    },
    [forgotPassword.rejected]: (state) => {
      state.isResetEmailSend = false;
      state.isButtonDisabled = false;
    },
    [resetPassword.pending]: (state) => {
      state.isPasswordReset = false;
      state.isButtonDisabled = true;
    },
    [resetPassword.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.isPasswordReset = true;
      } else {
        consoleError('Повторите попытку позже.');
      }
      state.isButtonDisabled = false;
    },
    [resetPassword.rejected]: (state) => {
      state.isPasswordReset = false;
      state.isButtonDisabled = false;
    }
  }
});

export const {
  resetPasswordData,
} = passwordSlice.actions;

export default passwordSlice.reducer;