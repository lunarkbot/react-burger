import ingredientsSliceReducer, {
  addSelectedItem,
  deleteSelectedItem,
  updateSelectedList,
  resetTotalPrice,
  setTotalPrice,
  setIngredientDetails,
  getIngredientsDetails,
  resetIngredientDetails,
  addQuantity,
  decreaseQuantity,
  resetSelectedItem,
  getIngredients,
} from '../ingredientsSlice';

global.fetch = jest.fn();

const ingredient = {
  _id: 'id',
  image_large: 'url',
  text: 'text',
  name: 'name',
  calories: 0,
  proteins: 0,
  fat: 0,
  carbohydrates: 0,
  price: 0,
  image_mobile: 'url',
  image: 'url',
  quantity: 0,
  type: 'bun',
}

const state = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
  isItemsLoaded: false,

  selectedItems: {
    items: [],
    bun: null
  },

  totalPrice: 0,

  ingredientDetails: null,
}


describe('ingredientsSlice', () => {
  it('Should return default state when passed an ampty action', () => {
    const result = ingredientsSliceReducer(undefined, { type: '' });

    expect(result).toEqual(state);
  });

  it('Should add item with "addSelectedItem" action', () => {
    const action = {
      type: addSelectedItem.type,
      payload: ingredient
    };

    const result = ingredientsSliceReducer(undefined, action);
    expect(result.selectedItems?.bun?._id).toBe('id');
  });

  it('Should delete item with "deleteSelectedItem" action', () => {
    const action = {
      type: deleteSelectedItem.type,
      payload: {
        items: [ingredient]
      }
    };

    const result = ingredientsSliceReducer(undefined, action);
    expect(result.selectedItems.items).toEqual([]);
  });

  it('Should update list of items with "updateSelectedList" action', () => {
    const action = {
      type: updateSelectedList.type,
      payload: [ingredient]
    };

    const result = ingredientsSliceReducer(undefined, action);
    expect(result.selectedItems.items[0]).toEqual(ingredient);
  });

  it('Should reset total price with "resetTotalPrice" action', () => {
    const action = {
      type: resetTotalPrice.type,
    };

    const result = ingredientsSliceReducer(undefined, action);
    expect(result.totalPrice).toBe(0);
  });

  it('Should set total price with "setTotalPrice" action', () => {
    const action = {
      type: setTotalPrice.type,
    };

    const result = ingredientsSliceReducer(undefined, action);
    expect(result.totalPrice).toBe(0);
  });

  it('Should set details of ingredient with "setIngredientDetails" action', () => {
    const action = {
      type: setIngredientDetails.type,
      payload: ingredient
    };

    const result = ingredientsSliceReducer(undefined, action);
    expect(result.ingredientDetails).toEqual(ingredient);
  });

  it('Should reset details of ingredient with "resetIngredientDetails" action', () => {
    const action = {
      type: resetIngredientDetails.type,
    };

    const result = ingredientsSliceReducer(undefined, action);
    expect(result.ingredientDetails).toBe(null);
  });

  it('Should get details of ingredient with "getIngredientsDetails" action', () => {
    const action = {
      type: getIngredientsDetails.type,
      payload: 'id'
    };

    const result = ingredientsSliceReducer({...state, items: [{_id: 'id'} as any], ingredientDetails: null}, action);
    expect(result.ingredientDetails?._id).toBe('id');
  });

  it('Should add quantity of ingredient with "addQuantity" action', () => {
    const action = {
      type: addQuantity.type,
      payload: {
        type: 'bun',
        id: 'id'
      }
    };

    const result = ingredientsSliceReducer({...state, items: [ingredient]}, action);
    expect(result.items[0].quantity).toBe(1);
  });

  it('Should decrease quantity of ingredient with "decreaseQuantity" action', () => {
    const action = {
      type: decreaseQuantity.type,
      payload: 'id'
    };

    const result = ingredientsSliceReducer({...state, items: [{...ingredient, quantity: 1}]}, action);
    expect(result.items[0].quantity).toBe(0);
  });

  it('Should reset selected item with "resetSelectedItem" action', () => {
    const action = {
      type: resetSelectedItem.type,
    };

    const result = ingredientsSliceReducer({
      ...state,
      selectedItems: {
        items: [ingredient],
        bun: null
      }
      }, action);
    expect(result.selectedItems.items).toHaveLength(0);
  });

  it('Should fetch "getIngredients" with resolved response', async () => {
    const mockResponse = {
      success: true,
      data: [ingredient]
    }

    // @ts-ignore
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const dispatch = jest.fn();
    const thunk = getIngredients();

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(getIngredients.pending.type);
    expect(end[0].type).toBe(getIngredients.fulfilled.type);
    expect(end[0].payload).toEqual(mockResponse);
  });

  it('Should fetch "getIngredients" with rejected response', async () => {
    // @ts-ignore
    fetch.mockResolvedValue({
      ok: false,
    })

    const dispatch = jest.fn();
    const thunk = getIngredients();

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(getIngredients.pending.type);
    expect(end[0].type).toBe(getIngredients.rejected.type);
  });
});
