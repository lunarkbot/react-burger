import { createSlice } from '@reduxjs/toolkit';

type TTabsSlice = {
  currentTab: string;
  isVisible: {
    [key: string]: boolean;
  }
}

const initialState: TTabsSlice = {
  currentTab: 'bun',
  isVisible: {
    bun: true,
    sauce: false,
    main: false
  }
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
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
