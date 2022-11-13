import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import api, {TUserData} from '../utils/api';
import consoleError from '../utils/consoleError';

export const signUp = createAsyncThunk(
  'users/signUp',
  async function(data: TUserData, {rejectWithValue}) {
    try {
      return await api.signUp(data);
    } catch(err) {
      return rejectWithValue(err);
    }
  }
)

export const signIn = createAsyncThunk(
  'users/signIn',
  async function (data: TUserData, {rejectWithValue}) {
    try {
      return await api.signIn(data)
    } catch (err) {
      return rejectWithValue(err);
    }
  }
)

export const authUser = createAsyncThunk(
  'users/authUser',
  async function (dispatch: any, {rejectWithValue}) {
    try {
      return await api.authUser();
    } catch (err) {
      dispatch(getToken(dispatch));
      return rejectWithValue(err);
    }
  }
)

type TUpdateUser = {
  dispatch: any;
  data: TUserData;
}

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async function ({dispatch, data}: TUpdateUser, {rejectWithValue}) {
    try {
      return await api.updateUser(data);
    } catch (err) {
      dispatch(getToken(dispatch));
      return rejectWithValue(err);
    }
  }
)

export const getToken = createAsyncThunk(
  'users/getToken',
  async function (dispatch: any, {rejectWithValue}) {
    try {
      return await api.refreshToken()
        .then((data: any) => {
          if (data.success) {
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            dispatch(authUser(dispatch));
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

type TString = {
  [key: string]: string;
}

type TBoolean = {
  [key: string]: boolean;
}

type TUsersSlice = {
  form: TString;
  profile: TString;
  user: {
    email: string;
    name: string;
    isAuth: boolean;
    isLoaded: boolean;
    isPendingAuth: boolean;
  };
  registration: TBoolean;
  login: TBoolean;
  isSubmitDisabled: boolean;
}

const initialState: TUsersSlice = {
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
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
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
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.registration.isFailed = false;
      state.registration.isSuccess = false;
      state.isSubmitDisabled = true;
    })

    builder.addCase(signUp.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload.success) {
        state.registration.isSuccess = true;
        state.user.isAuth = true;
        usersSlice.caseReducers.setUserData(state, action);
      } else {
        consoleError('Попробуйте повторить попытку позже...');
      }
      state.isSubmitDisabled = false;
      usersSlice.caseReducers.resetFormInput(state);
    })

    builder.addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
      state.registration.isFailed = true;
      state.isSubmitDisabled = false;
      consoleError(action.payload);
    })

    builder.addCase(signIn.pending, (state) => {
      state.login.isFailed = false;
      state.login.isSuccess = false;
      state.isSubmitDisabled = true;
    })

    builder.addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload.success) {
        state.login.isSuccess = true;
        state.user.isAuth = true;
        usersSlice.caseReducers.setUserData(state, action);
      } else {
        consoleError('Попробуйте повторить попытку позже...');
      }
      state.isSubmitDisabled = false;
      usersSlice.caseReducers.resetFormInput(state);
    })

    builder.addCase(signIn.rejected, (state, action: PayloadAction<any>) => {
      state.login.isFailed = true;
      state.isSubmitDisabled = false;
      consoleError(action.payload);
    })

    builder.addCase(authUser.pending, (state) => {
      state.user.isPendingAuth = true;
    })

    builder.addCase(authUser.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload.success) {
        state.user.isAuth = true;
        state.user.name = action.payload.user.name;
        state.profile.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.profile.email = action.payload.user.email;
        state.user.isLoaded = false;
        state.registration.isSuccess = false;
        state.login.isSuccess = false;
      } else {
        consoleError('Попробуйте повторить попытку позже...');
      }
      state.user.isPendingAuth = false;
    })

    builder.addCase(authUser.rejected, (state, action: PayloadAction<any>) => {
      if (state.user.isLoaded) {
        state.user.isAuth = false;
      }

      if (action.payload) consoleError(action.payload);
      state.user.isPendingAuth = false;
    })

    builder.addCase(updateUser.pending, (state) => {
      state.isSubmitDisabled = true;
    })

    builder.addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload.success) {
        state.user.name = action.payload.user.name;
        state.profile.name = action.payload.user.name;
        state.user.email = action.payload.user.email;
        state.profile.email = action.payload.user.email;
        state.user.isLoaded = false;
      } else {
        consoleError('Попробуйте повторить попытку позже...');
      }
      state.isSubmitDisabled = false;
    })

    builder.addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
      if (state.user.isLoaded) {
        consoleError(action.payload.error);
      }
      state.isSubmitDisabled = false;
    })

    builder.addCase(getToken.pending, (state) => {
      state.user.isLoaded = true;
    })

    builder.addCase(getToken.rejected, (state, action: PayloadAction<any>) => {
      consoleError(action.payload);
    })

    builder.addCase(signOut.fulfilled, (state, action: PayloadAction<any>) => {
      if (action.payload.success) {
        usersSlice.caseReducers.resetUserData(state);
      } else {
        consoleError('Попробуйте повторить попытку позже...');
      }
    })

    builder.addCase(signOut.rejected, (state, action: PayloadAction<any>) => {
      consoleError(action.payload);
    })
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