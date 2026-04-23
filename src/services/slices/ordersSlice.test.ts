import ordersReducer, { fetchFeeds } from './ordersSlice';

const feedsPayload = {
  success: true,
  orders: [
    {
      _id: 'order-1',
      ingredients: ['bun-1', 'main-1'],
      status: 'done',
      name: 'Space бургер',
      createdAt: '2026-04-20T10:00:00.000Z',
      updatedAt: '2026-04-20T10:05:00.000Z',
      number: 101
    }
  ],
  total: 1000,
  totalToday: 50
};

describe('ordersSlice reducer', () => {
  it('должен устанавливать isFeedsLoading=true при fetchFeeds.pending', () => {
    const state = ordersReducer(undefined, fetchFeeds.pending('', undefined));

    expect(state.isFeedsLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ленту и выключать загрузку при fetchFeeds.fulfilled', () => {
    const state = ordersReducer(
      undefined,
      fetchFeeds.fulfilled(feedsPayload, '', undefined)
    );

    expect(state.isFeedsLoading).toBe(false);
    expect(state.feed.orders).toEqual(feedsPayload.orders);
    expect(state.feed.total).toBe(feedsPayload.total);
    expect(state.feed.totalToday).toBe(feedsPayload.totalToday);
  });

  it('должен сохранять ошибку и выключать загрузку при fetchFeeds.rejected', () => {
    const errorMessage = 'Ошибка загрузки ленты';
    const state = ordersReducer(
      undefined,
      fetchFeeds.rejected(new Error(errorMessage), '', undefined)
    );

    expect(state.isFeedsLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});