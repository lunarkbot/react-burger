import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import api from '../utils/api';

export const signUp = createAsyncThunk(
  'users/signUp',
  async function(data, {rejectWithValue}) {
    try {
      return await api.signUp(data);
    } catch(err) {
      //return rejectWithValue(err);
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
      verificationCode: '',
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
    }
  },
  reducers: {
    updateFormInput(state, action) {
      state.form[action.payload.name] = action.payload.value;
    },
    updateProfile(state, action) {
      state.profile[action.payload.name] = action.payload.value;
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

      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
      state.user.accessToken = action.payload.accessToken;
      state.user.refreshToken = action.payload.refreshToken;

      state.profile.email = action.payload.user.email;
      state.profile.name = action.payload.user.name;

      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    [signUp.rejected]: (state, action) => {
      state.registration.isFailed = true;
    }
  }
})

export const {
  updateFormInput,
  updateProfile,
} = usersSlice.actions;

export default usersSlice.reducer;