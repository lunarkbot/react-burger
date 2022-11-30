import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import api, {TUserData} from '../utils/api';
import consoleError from '../utils/consoleError';

export const forgotPassword = createAsyncThunk(
  'users/forgotPassword',
  async function (data: TUserData, {rejectWithValue}) {
    try {
      return await api.forgotPassword(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async function (data: TUserData, {rejectWithValue}) {
    try {
      return await api.resetPassword(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

type TPasswordSlice = {
  [key: string]: boolean;
}

const initialState: TPasswordSlice = {
  isResetEmailSend: false,
  isPasswordReset: false,
  isButtonDisabled: false,
}

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    resetPasswordData(state) {
      state.isPasswordReset = false;
      state.isResetEmailSend = false;
      state.isButtonDisabled = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state) => {
      state.isResetEmailSend = false;
      state.isButtonDisabled = true;
    })

    builder.addCase(forgotPassword.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload.success) {
        state.isResetEmailSend = true;
      } else {
        consoleError('Повторите попытку позже.');
      }
      state.isButtonDisabled = false;
    })

    builder.addCase(forgotPassword.rejected, (state) => {
      state.isResetEmailSend = false;
      state.isButtonDisabled = false;
    })

    builder.addCase(resetPassword.pending, (state) => {
      state.isPasswordReset = false;
      state.isButtonDisabled = true;
    })

    builder.addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload.success) {
        state.isPasswordReset = true;
      } else {
        consoleError('Повторите попытку позже.');
      }
      state.isButtonDisabled = false;
    })

    builder.addCase(resetPassword.rejected, (state) => {
      state.isPasswordReset = false;
      state.isButtonDisabled = false;
    })
  }
});

export const {
  resetPasswordData,
} = passwordSlice.actions;

export default passwordSlice.reducer;
