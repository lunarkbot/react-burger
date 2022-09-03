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
    }
  },
  reducers: {
    updateInput(state, action) {
      state.form[action.payload.name] = action.payload.value;
    }
  }
})

export const { updateInput } = usersSlice.actions;

export default usersSlice.reducer;