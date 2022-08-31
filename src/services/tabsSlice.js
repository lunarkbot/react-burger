import { createSlice } from '@reduxjs/toolkit';

const tabsSlice = createSlice({
  name: 'tabs',
  initialState: {
    currentTab: 'bun',
    isVisible: {
      bun: true,
      sauce: false,
      main: false
    }
  },
  reducers: {
    setCurrentTab(state, action) {
      state.currentTab = action.payload;
    },
    setVisibility(state, action) {
      state.isVisible[action.payload.name] = action.payload.value;
    }
  }
})

export const { setCurrentTab, setVisibility } = tabsSlice.actions;

export default tabsSlice.reducer;