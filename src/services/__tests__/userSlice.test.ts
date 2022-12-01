import userSliceReducer, {
  updateFormInput,
  resetFormInput,
  updateProfile,
  resetProfile,
  resetUserData,
  setUserData,
  signUp,
  signIn,
  authUser,
  updateUser,
  getToken,
  signOut,
} from '../usersSlice';

global.fetch = jest.fn();

const mockUser = {
  name: 'Test User',
  password: 'password',
  email: 'test@domain.com'
}

const state = {
  form: {
    email: '',
    password: '',
    name: '',
    token: '',
  },
  profile: {
    email: '',
    password: '',
    name: '',
  },
  user: {
    email: '',
    name: '',
    isAuth: false,
    isLoaded: false,
    isPendingAuth: true,
  },
  registration: {
    isFailed: false,
    isSuccess: false
  },
  login: {
    isFailed: false,
    isSuccess: false
  },
  isSubmitDisabled: false,
}

describe('userSlice', () => {
  it('Should return default state when passed an empty action', () => {
    const result = userSliceReducer(undefined, { type: '' });

    expect(result).toEqual(state);
  });

  it('Should update input with "updateFormInput" action', () => {
    const action = {
      type: updateFormInput.type,
      payload: {
        name: 'email',
        value: mockUser.email
      }
    };

    const result = userSliceReducer(undefined, action);
    expect(result.form.email).toBe(mockUser.email);
  });

  it('Should reset form with "resetFormInput" action', () => {
    const action = {
      type: resetFormInput.type,
    };

    const result = userSliceReducer({...state, form: {...state.form, email: mockUser.email }}, action);
    expect(result.form.email).toBe('');
  });

  it('Should update profile with "updateProfile" action', () => {
    const action = {
      type: updateProfile.type,
      payload: {
        name: 'email',
        value: mockUser.email
      }
    };

    const result = userSliceReducer(state, action);
    expect(result.profile.email).toBe(mockUser.email);
  });

  it('Should reset profile with "resetUserData" action', () => {
    const action = {
      type: resetUserData.type,
    };

    const result = userSliceReducer({...state, user: {...state.user, email: mockUser.email }}, action);
    expect(result.user.email).toBe('');
  });

  it('Should reset user data with "resetProfile" action', () => {
    const action = {
      type: resetProfile.type,
    };

    const result = userSliceReducer({...state, profile: {...state.profile, email: mockUser.email }}, action);
    expect(result.profile.email).toBe('');
  });

  it('Should set user data with "setUserData" action', () => {
    const action = {
      type: setUserData.type,
      payload: {
        user: mockUser
      }
    };

    const result = userSliceReducer(state, action);
    expect(result.user.email).toBe(mockUser.email);
  });

  it('Should fetch "signUp" with resolved response', async () => {
    const mockResponse = {
      success: true,
      user: mockUser
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const dispatch = jest.fn();
    const thunk = signUp(mockUser);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(signUp.pending.type);
    expect(end[0].type).toBe(signUp.fulfilled.type);
    expect(end[0].payload).toEqual(mockResponse);
  });

  it('Should fetch "signUp" with rejected response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    })

    const dispatch = jest.fn();
    const thunk = signUp(mockUser);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(signUp.pending.type);
    expect(end[0].type).toBe(signUp.rejected.type);
  });

  it('Should fetch "signIn" with resolved response', async () => {
    const mockResponse = {
      success: true,
      user: mockUser
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const dispatch = jest.fn();
    const thunk = signIn(mockUser);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(signIn.pending.type);
    expect(end[0].type).toBe(signIn.fulfilled.type);
    expect(end[0].payload).toEqual(mockResponse);
  });

  it('Should fetch "signIn" with rejected response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    })

    const dispatch = jest.fn();
    const thunk = signIn(mockUser);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(signIn.pending.type);
    expect(end[0].type).toBe(signIn.rejected.type);
  });

  it('Should fetch "authUser" with resolved response', async () => {
    const mockResponse = {
      success: true,
      user: mockUser
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const dispatch = jest.fn();
    const thunk = authUser(mockUser as any);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(authUser.pending.type);
    expect(end[0].type).toBe(authUser.fulfilled.type);
    expect(end[0].payload).toEqual(mockResponse);
  });

  it('Should fetch "authUser" with rejected response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    })

    const dispatch = jest.fn();
    const thunk = authUser(mockUser as any);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(authUser.pending.type);
    expect(end[0].type).toBe(authUser.rejected.type);
  });

  it('Should fetch "updateUser" with resolved response', async () => {
    const mockResponse = {
      success: true,
      user: mockUser
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const dispatch = jest.fn();
    const thunk = updateUser({
      dispatch: null,
      data: mockUser
    } as any
    );

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(updateUser.pending.type);
    expect(end[0].type).toBe(updateUser.fulfilled.type);
    expect(end[0].payload).toEqual(mockResponse);
  });

  it('Should fetch "updateUser" with rejected response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    })

    const dispatch = jest.fn();
    const thunk = updateUser({
        dispatch: null,
        data: mockUser
      } as any
    );

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(updateUser.pending.type);
    expect(end[0].type).toBe(updateUser.rejected.type);
  });

  it('Should fetch "getToken" with resolved response', async () => {
    const mockResponse = {
      success: true,
      accessToken: 'accessToken',
      refreshToken: 'refreshToken'
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const dispatch = jest.fn();
    const thunk = getToken(null as any);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [start] = calls;
    expect(start[0].type).toBe(getToken.pending.type);
  });

  it('Should fetch "getToken" with rejected response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    })

    const dispatch = jest.fn();
    const thunk = getToken(null as any);

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(getToken.pending.type);
    expect(end[0].type).toBe(getToken.rejected.type);
  });

  it('Should fetch "signOut" with resolved response', async () => {
    const mockResponse = {
      success: true,
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    })

    const dispatch = jest.fn();
    const thunk = signOut();

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(signOut.pending.type);
    expect(end[0].type).toBe(signOut.fulfilled.type);
    expect(end[0].payload).toEqual(mockResponse);
  });

  it('Should fetch "signOut" with rejected response', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
    })

    const dispatch = jest.fn();
    const thunk = signOut();

    await thunk(dispatch, () => ({}), null);

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);

    const [start, end] = calls;
    expect(start[0].type).toBe(signOut.pending.type);
    expect(end[0].type).toBe(signOut.rejected.type);
  });
});
