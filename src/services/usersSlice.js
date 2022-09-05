import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../utils/api';
import consoleError from '../utils/consoleError';

export const signUp = createAsyncThunk(
  'users/signUp',
  async function(data, {rejectWithValue}) {
    try {
      return await api.signUp(data);
    } catch(err) {
      return rejectWithValue(err);
    }
  }
)

export const signIn = createAsyncThunk(
  'users/signIn',
  async function (data, {rejectWithValue}) {
    try {
      return await api.signIn(data)
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    form: {
      email: '',
      password: '',
      name: '',
      token: '',
    },
    profile: {
      email: '',
      password: '',
      name: '',
    },
    user: {
      email: '',
      password: '',
      name: '',
      accessToken: null,
      refreshToken: null,
      isAuth: false,
    },
    registration: {
      isFailed: false,
      isSuccess: false
    },
    login: {
      isFailed: false,
      isSuccess: false
    }
  },
  reducers: {
    updateFormInput(state, action) {
      state.form[action.payload.name] = action.payload.value;
    },
    resetFormInput(state) {
      state.form.email = '';
      state.form.password = '';
      state.form.name = '';
      state.form.token = '';
    },
    updateProfile(state, action) {
      state.profile[action.payload.name] = action.payload.value;
    },
    resetProfile(state) {
      state.profile.email = '';
      state.profile.password = '';
      state.profile.name = '';
    },
    setUserData(state, action) {
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
      state.user.accessToken = action.payload.accessToken;
      state.user.refreshToken = action.payload.refreshToken;

      state.profile.email = action.payload.user.email;
      state.profile.name = action.payload.user.name;

      localStorage.setItem('refreshToken', action.payload.refreshToken);
    }
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.registration.isFailed = false;
      state.registration.isSuccess = false;
    },
    [signUp.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.registration.isSuccess = true;

      usersSlice.caseReducers.setUserData(state, action);
    },
    [signUp.rejected]: (state, action) => {
      state.registration.isFailed = true;
      consoleError(action.payload);
    },
    [signIn.pending]: (state) => {
      state.login.isFailed = false;
      state.login.isSuccess = false;
    },
    [signIn.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.login.isSuccess = true;

      usersSlice.caseReducers.setUserData(state, action);
    },
    [signIn.rejected]: (state, action) => {
      state.login.isFailed = true;
      consoleError(action.payload);
    },

  }
})

export const {
  updateFormInput,
  resetFormInput,
  updateProfile,
  resetProfile,
} = usersSlice.actions;

export default usersSlice.reducer;