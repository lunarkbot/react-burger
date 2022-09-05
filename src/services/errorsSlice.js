import {createSlice} from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'errors',
  initialState: {
    name: {
      isShow: false,
      text: ''
    },
    email: {
      isShow: false,
      text: ''
    },
    password: {
      isShow: false,
      text: ''
    },
    verificationCode: {
      isShow: false,
      text: ''
    },
  },
  reducers: {
    showError(state, action) {
      const name = action.payload.name;

      state[name].isShow = true;
      state[name].text = action.payload.text;
    },
    hideError(state, action) {
      const name = action.payload.name;

      state[name].isShow = false;
      state[name].text = '';
    },
    resetError(state) {
      state.name.isShow = false;
      state.name.text = '';
      state.email.isShow = false;
      state.email.text = '';
      state.verificationCode.isShow = false;
      state.verificationCode.text = '';
      state.password.isShow = false;
      state.password.text = '';
    }
  }
})

export const {
  showError,
  hideError,
  resetError
} = errorSlice.actions;

export default errorSlice.reducer;
