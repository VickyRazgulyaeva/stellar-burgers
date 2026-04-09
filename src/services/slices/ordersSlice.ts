import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi, getOrderByNumberApi, getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

type TOrdersState = {
  feed: {
    orders: TOrder[];
    total: number;
    totalToday: number;
  };
  profileOrders: TOrder[];
  orderData: TOrder | null;
  isFeedsLoading: boolean;
  isProfileOrdersLoading: boolean;
  isOrderLoading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
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
};

export const fetchFeeds = createAsyncThunk('orders/fetchFeeds', async () =>
  getFeedsApi()
);

export const fetchProfileOrders = createAsyncThunk(
  'orders/fetchProfileOrders',
  async () => getOrdersApi()
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0] || null;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isFeedsLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.feed = {
          orders: action.payload.orders,
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ленты';
      })
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isProfileOrdersLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.isProfileOrdersLoading = false;
        state.profileOrders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.isProfileOrdersLoading = false;
        state.error = action.error.message || 'Ошибка загрузки истории заказов';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isOrderLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export default ordersSlice.reducer;
