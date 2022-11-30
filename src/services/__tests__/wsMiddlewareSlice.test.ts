import wsMiddlewareReducer, {
  wsClose,
  onOpen,
  onClose,
  onMessage,
  resetState
} from '../wsMiddlewareSlice';

const state = {
  isConnected: false,
  orders: null,
  total: null,
  totalToday: null,
};

describe('wsMiddlewareSlice', () => {
  it('Should return default state when passed an empty action', () => {
    const result = wsMiddlewareReducer(undefined, { type: '' });

    expect(result).toEqual(state);
  });

  it('Should be connection closed with "wsClose" action', () => {
    const action = {
      type: wsClose.type,
      payload: 'String'
    }

    const result = wsMiddlewareReducer(undefined, action);

    expect(result.isConnected).toBe(false);
  });

  it('Should be connection opened with "onOpen" action', () => {
    const action = {
      type: onOpen.type,
      payload: 'String'
    }

    const result = wsMiddlewareReducer(undefined, action);

    expect(result.isConnected).toBe(true);
  });

  it('Should be connection closed with "onClose" action', () => {
    const action = {
      type: onClose.type,
      payload: 'String'
    }

    const result = wsMiddlewareReducer(undefined, action);

    expect(result.isConnected).toBe(false);
  });

  it('Should reset state with "resetState" action', () => {
    const action = {
      type: resetState.type
    }

    const result = wsMiddlewareReducer(undefined, action);

    expect(result).toEqual(state);
  });

  it('Should receive message from WS with "onMessage" action', () => {
    const payload = {
      orders: [{
        _id: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        status: 'string',
        number: 123,
        name: 'string',
        ingredients: [''],
      }],
      total: 100,
      totalToday: 100,
    }

    const action = {
      type: onMessage.type,
      payload
    }

    const result = wsMiddlewareReducer(undefined, action);

    console.log(result)

    expect(result.orders).toEqual(payload.orders);
    expect(result.totalToday).toBe(100);
    expect(result.total).toBe(100);
  });
});
