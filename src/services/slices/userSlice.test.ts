import userReducer, {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './userSlice';

const user = {
  name: 'Test User',
  email: 'test@example.com'
};

describe('userSlice reducer', () => {
  it('должен возвращать initial state', () => {
    const state = userReducer(undefined, { type: '@@INIT' });

    expect(state).toEqual({
      user: null,
      isAuthChecked: false,
      authError: null,
      updateUserError: null
    });
  });

  it('должен обрабатывать registerUser.fulfilled', () => {
    const state = userReducer(
      undefined,
      registerUser.fulfilled(user, '', {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password'
      })
    );

    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
    expect(state.authError).toBeNull();
  });

  it('должен обрабатывать loginUser.rejected', () => {
    const errorMessage = 'Ошибка входа';
    const state = userReducer(
      undefined,
      loginUser.rejected(new Error(errorMessage), '', {
        email: 'test@example.com',
        password: 'password'
      })
    );

    expect(state.authError).toBe(errorMessage);
  });

  it('должен обрабатывать getUser.rejected', () => {
    const initialState = {
      user,
      isAuthChecked: false,
      authError: null,
      updateUserError: null
    };

    const state = userReducer(
      initialState,
      getUser.rejected(new Error('unauthorized'), '', undefined)
    );

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен обрабатывать updateUser.rejected', () => {
    const errorMessage = 'Ошибка обновления профиля';
    const state = userReducer(
      undefined,
      updateUser.rejected(new Error(errorMessage), '', { name: 'New Name' })
    );

    expect(state.updateUserError).toBe(errorMessage);
  });

  it('должен обрабатывать logoutUser.fulfilled', () => {
    const initialState = {
      user,
      isAuthChecked: false,
      authError: null,
      updateUserError: null
    };

    const state = userReducer(initialState, logoutUser.fulfilled(undefined, ''));

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });
});