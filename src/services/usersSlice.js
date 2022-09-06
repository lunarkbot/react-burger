import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../utils/api';
import consoleError from '../utils/consoleError';
import {useDispatch} from 'react-redux';

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

export const authUser = createAsyncThunk(
  'users/authUser',
  async function (dispatch, {rejectWithValue}) {
    console.log('f-authUser')
    try {
      return await api.authUser();
    } catch (err) {
      dispatch(getToken(dispatch));
      return rejectWithValue(err);
    }
  }
)

export const getToken = createAsyncThunk(
  'users/getToken',
  async function (dispatch, {rejectWithValue}) {
    console.log('f-getToken')
    try {
      return await api.refreshToken()
        .then(data => {
          console.log(data)
          if (data.success) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            console.log('новый токен доступа получен')
            dispatch(authUser());
          } else {
            consoleError('Попробуйте повторить попытку позже...');
          }
          return data;
        });
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
    },
    isSubmitDisabled: false,
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

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
  },
  extraReducers: {
    [signUp.pending]: (state) => {
      state.registration.isFailed = false;
      state.registration.isSuccess = false;
      state.isSubmitDisabled = true;
    },
    [signUp.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.registration.isSuccess = true;
        usersSlice.caseReducers.setUserData(state, action);
      } else {
        consoleError('Попробуйте повторить попытку позже...');
      }
      state.isSubmitDisabled = false;
    },
    [signUp.rejected]: (state, action) => {
      state.registration.isFailed = true;
      state.isSubmitDisabled = false;
      consoleError(action.payload);
    },

    [signIn.pending]: (state) => {
      state.login.isFailed = false;
      state.login.isSuccess = false;
      state.isSubmitDisabled = true;
    },
    [signIn.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.login.isSuccess = true;
        usersSlice.caseReducers.setUserData(state, action);
      } else {
        consoleError('Попробуйте повторить попытку позже...');
      }
      state.isSubmitDisabled = false;
    },
    [signIn.rejected]: (state, action) => {
      state.login.isFailed = true;
      state.isSubmitDisabled = false;
      consoleError(action.payload);
    },

    [authUser.pending]: (state) => {
      state.user.isAuth = false;
    },
    [authUser.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.user.isAuth = true;
        state.user.name = action.payload.user.name;
        state.profile.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.profile.email = action.payload.user.email;
      } else {
        consoleError('Попробуйте повторить попытку позже...');
      }
    },
    [authUser.rejected]: (state, action) => {
      state.user.isAuth = false;
      consoleError(action.payload);
    },

    [getToken.rejected]: (state, action) => {
      console.log('чет пошло не так при получении токена доступа')
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