import passwordSliceReducer, {
  forgotPassword,
  resetPassword,
  resetPasswordData,
} from '../passwordSlice';

global.fetch = jest.fn();

const state = {
  isResetEmailSend: false,
  isPasswordReset: false,
  isButtonDisabled: false,
};

const mockUser = {
  email: "test@domain.com",
  name: "Test User",
  password: "12345678",
}

describe('passwordSlice', () => {
  it('Should return default state when passed an empty action', () => {
    const result = passwordSliceReducer(undefined, { type: '' });

    expect(result).toEqual(state);
  });

  it('Should reset passwords with "resetPasswordData" action', () => {
    const result = passwordSliceReducer(undefined, { type: resetPasswordData.type });

    expect(result).toEqual(state);
  });

  it('Should fetch "forgotPassword" with resolved response', async () => {
    const mockResponse = {
      success: true,
    }

    // @ts-ignore
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const dispatch = jest.fn();
    const thunk = forgotPassword(mockUser);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(forgotPassword.pending.type);
    expect(end[0].type).toBe(forgotPassword.fulfilled.type);
    expect(end[0].payload).toBe(mockResponse);
  });

  it('Should fetch "forgotPassword" with rejected response', async () => {
    // @ts-ignore
    fetch.mockResolvedValue({
      ok: false,
    })

    const dispatch = jest.fn();
    const thunk = forgotPassword(mockUser);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(forgotPassword.pending.type);
    expect(end[0].type).toBe(forgotPassword.rejected.type);
  });

  it('Should fetch "resetPassword" with resolved response', async () => {
    const mockResponse = {
      success: true,
    }

    // @ts-ignore
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const dispatch = jest.fn();
    const thunk = resetPassword(mockUser);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(resetPassword.pending.type);
    expect(end[0].type).toBe(resetPassword.fulfilled.type);
    expect(end[0].payload).toBe(mockResponse);
  });

  it('Should fetch "resetPassword" with rejected response', async () => {
    // @ts-ignore
    fetch.mockResolvedValue({
      ok: false,
    })

    const dispatch = jest.fn();
    const thunk = resetPassword(mockUser);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(resetPassword.pending.type);
    expect(end[0].type).toBe(resetPassword.rejected.type);
  });
});
