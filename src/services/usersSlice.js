import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    form: {
      email: '',
      password: '',
      name: '',
      verificationCode: '',
    },
    user: {
      email: 'mail@stellar.burgers',
      password: 'password',
      name: 'Марк',
      accessToken: null,
      refreshToken: null,
    }
  },
  reducers: {
    updateFormInput(state, action) {
      state.form[action.payload.name] = action.payload.value;
    },
    updateProfile(state, action) {
      state.user[action.payload.name] = action.payload.value;
    }
  }
})

export const {
  updateFormInput,
  updateProfile,
} = usersSlice.actions;

export default usersSlice.reducer;