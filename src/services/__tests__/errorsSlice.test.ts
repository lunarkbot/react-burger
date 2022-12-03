import errorReducer, {
  showError,
  hideError,
  resetError,
  resetErrors,
} from '../errorsSlice';

describe('errorsSlice', () => {
  it('should return default state when passed an empty action', () => {
    const state = {
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
    }
    const result = errorReducer(undefined, { type: '' });

    expect(result).toEqual(state);
  });

  it('should show error with "showError" action', () => {
    const action = {
      type: showError.type,
      payload: {
        name: 'email',
        text: 'input error'
      }
    };

    const result = errorReducer(undefined, action);

    expect(result.email.text).toBe('input error');
    expect(result.email.isShow).toBe(true);
  });

  it('should hide error with "hideError" action', () => {
    const action = {
      type: hideError.type,
      payload: {
        name: 'email',
      }
    };

    const result = errorReducer(undefined, action);

    expect(result.email.text).toBe('');
    expect(result.email.isShow).toBe(false);
  });

  it('should reset errors with "resetErrors" action', () => {
    const action = {
      type: resetErrors.type,
    };

    const result = errorReducer(undefined, action);

    expect(result.name.text).toBe('');
    expect(result.name.isShow).toBe(false);
    expect(result.email.text).toBe('');
    expect(result.email.isShow).toBe(false);
    expect(result.token.text).toBe('');
    expect(result.token.isShow).toBe(false);
    expect(result.password.text).toBe('');
    expect(result.password.isShow).toBe(false);
  });

  it('should reset error with "resetError" action', () => {
    const action = {
      type: resetError.type,
      payload: 'email'
    };

    const result = errorReducer(undefined, action);

    expect(result.email.text).toBe('');
    expect(result.email.isShow).toBe(false);
  });
});
