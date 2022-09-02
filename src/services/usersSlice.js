import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    form: {
      email: '',
      password: '',
    }
  },
  reducers: {
    updateInput(state, action) {
      console.log()
      state.form[action.payload.name] = action.payload.value;
    }
  }
})

export const { updateInput } = usersSlice.actions;

export default usersSlice.reducer;