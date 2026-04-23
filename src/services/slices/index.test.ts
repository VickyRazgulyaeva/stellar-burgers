import { rootReducer } from './index';

describe('rootReducer', () => {
  it('должен корректно инициализировать состояние приложения', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: {
        items: [],
        isLoading: false,
        error: null
      },
      burgerConstructor: {
        constructorItems: {
          bun: null,
          ingredients: []
        },
        orderRequest: false,
        orderModalData: null,
        error: null
      },
      user: {
        user: null,
        isAuthChecked: false,
        authError: null,
        updateUserError: null
      },
      orders: {
        feed: {
          orders: [],
          total: 0,
          totalToday: 0
        },
        profileOrders: [],
        orderData: null,
        isFeedsLoading: false,
        isProfileOrdersLoading: false,
        isOrderLoading: false,
        error: null
      }
    });
  });
});