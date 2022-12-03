import ordersSliceReducer, {
  sendOrder,
  hideOrderDetails
} from '../ordersSlice';

const mockIngredient = {
  quantity: 1,
  calories: 1,
  carbohydrates: 1,
  fat: 1,
  price: 1,
  proteins: 1,
  image: 'string',
  image_large: 'string',
  image_mobile: 'string',
  name: 'string',
  type: 'string',
  _id: 'string',
  text: 'string',
}

global.fetch = jest.fn();

describe('ordersSlice', () => {
  it('Should return default state when passed an empty action', () => {
    const state = {
      orderDetail: null,
      orderDetailRequest: false,
      orderDetailFailed: false,
      isOrderDetailsShow: false
    };

    const result = ordersSliceReducer(undefined, { type: '' });

    expect(result).toEqual(state);
  });

  it('Should hide details of order with "hideOrderDetails" action', () => {
    const result = ordersSliceReducer(undefined, { type: hideOrderDetails.type });

    expect(result.isOrderDetailsShow).toBe(false);
  });

  it('Should fetch orders with resolved response', async () => {
    const mockOrder = {
      ingredients: {
        items: [
          mockIngredient
        ],
        bun: mockIngredient
      }
    };

    const mockResponse = {
      order: {
        number: 1,
      }
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const dispatch = jest.fn();
    const thunk = sendOrder(mockOrder);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(sendOrder.pending.type);
    expect(end[0].type).toBe(sendOrder.fulfilled.type);
    expect(end[0].payload).toBe(mockResponse);
  });

  it('Should fetch orders with rejected response', async () => {
    const mockOrder = {
      ingredients: {
        items: [
          mockIngredient
        ],
        bun: mockIngredient
      }
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    });

    const dispatch = jest.fn();
    const thunk = sendOrder(mockOrder);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;

    expect(start[0].type).toBe(sendOrder.pending.type);
    expect(end[0].type).toBe(sendOrder.rejected.type);
  })
});
