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
    token: {
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
    resetErrors(state) {
      state.name.isShow = false;
      state.name.text = '';
      state.email.isShow = false;
      state.email.text = '';
      state.token.isShow = false;
      state.token.text = '';
      state.password.isShow = false;
      state.password.text = '';
    },
    resetError(state, action) {
      state[action.payload].isShow = false;
      state[action.payload].text = '';
    },
  }
})

export const {
  showError,
  hideError,
  resetErrors,
  resetError
} = errorSlice.actions;

export default errorSlice.reducer;
