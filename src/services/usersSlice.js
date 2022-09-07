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

export const authUser = createAsyncThunk(
  'users/authUser',
  async function (dispatch, {rejectWithValue}) {
    if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
      try {
        console.log('try');
        return await api.authUser();
      } catch (err) {
        console.log('catch');
        dispatch(getToken(dispatch));
        return rejectWithValue(err);
      }
    } else {
      return rejectWithValue(true)
    }
  }
)

export const getToken = createAsyncThunk(
  'users/getToken',
  async function (dispatch, {rejectWithValue}) {
    try {
      return await api.refreshToken()
        .then(data => {
          if (data.success) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
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

export const signOut = createAsyncThunk(
  'users/signOut',
  async function (_, {rejectWithValue}) {
    try {
      return await api.signOut();
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
      name: '',
      isAuth: false,
      isLoaded: false,
      isPendingAuth: true,
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
      state.user.isAuth = true;

      state.profile.email = action.payload.user.email;
      state.profile.name = action.payload.user.name;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    resetUserData(state) {
      state.user.email = '';
      state.user.name = '';
      state.user.isAuth = false;

      usersSlice.caseReducers.resetProfile(state);

      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
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
        state.user.isAuth = true;
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
        state.user.isAuth = true;
        usersSlice.caseReducers.setUserData(state, action);
      } else {
        consoleError('Попробуйте повторить попытку позже...');
      }
      state.isSubmitDisabled = false;
      usersSlice.caseReducers.resetFormInput(state);
    },
    [signIn.rejected]: (state, action) => {
      state.login.isFailed = true;
      state.isSubmitDisabled = false;
      consoleError(action.payload);
    },

    [authUser.pending]: (state) => {
      state.user.isPendingAuth = true;
    },
    [authUser.fulfilled]: (state, action) => {
      if (action.payload.success) {
        state.user.isAuth = true;
        state.user.name = action.payload.user.name;
        state.profile.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.profile.email = action.payload.user.email;

        state.registration.isSuccess = false;
        state.login.isSuccess = false;
      } else {
        consoleError('Попробуйте повторить попытку позже...');
      }
      state.user.isPendingAuth = false;
    },
    [authUser.rejected]: (state, action) => {
      if (state.user.isLoaded) {
        state.user.isPendingAuth = false;
        state.user.isAuth = false;
      } else if (action.payload === true) {
        state.user.isPendingAuth = false;
        consoleError('Пользователь не авторизован');
      } else {
        consoleError(action.payload.error);
      }
    },

    [getToken.pending]: (state) => {
      console.log('getToken')
      state.user.isLoaded = true;
    },
    [getToken.rejected]: (state, action) => {
      console.log('чет пошло не так при получении токена доступа')
      consoleError(action.payload);
    },

    [signOut.fulfilled]: (state, action) => {
      if (action.payload.success) {
        usersSlice.caseReducers.resetUserData(state);
      } else {
        consoleError('Попробуйте повторить попытку позже...');
      }
    },
    [signOut.rejected]: (state, action) => {
      consoleError(action.payload);
    },
  }
})

export const {
  updateFormInput,
  resetFormInput,
  updateProfile,
  resetProfile,
  resetUserData,
} = usersSlice.actions;

export default usersSlice.reducer;