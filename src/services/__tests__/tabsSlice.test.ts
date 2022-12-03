import tabsReducer, {
  setCurrentTab,
  setVisibility
} from '../tabsSlice';

describe('tabsSlice', () => {
  it('Should return default state when passed an empty action.', () => {
    const state = {
      currentTab: 'bun',
      isVisible: {
        bun: true,
        sauce: false,
        main: false
      }
    };

    const result = tabsReducer(undefined, { type: '' });

    expect(result).toEqual(state);
  });

  it('Should set tab with "setCurrentTab" action.', () => {
    const action = {
      type: setCurrentTab.type,
      payload: 'tabName'
    }

    const result = tabsReducer(undefined, action);

    expect(result.currentTab).toBe('tabName');
  });

  it('Should set visibility of tab with "setVisibility" action', () => {
    const action = {
      type: setVisibility.type,
      payload: {
        name: 'main',
        value: true
      }
    }

    const result = tabsReducer(undefined, action);

    expect(result.isVisible.main).toBe(true);
  });
})
