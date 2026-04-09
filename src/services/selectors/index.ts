import { RootState } from '../store';

export const selectIngredients = (state: RootState) => state.ingredients.items;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;

export const selectFeedOrders = (state: RootState) => state.orders.feed.orders;
export const selectFeedMeta = (state: RootState) => state.orders.feed;
export const selectFeedLoading = (state: RootState) =>
  state.orders.isFeedsLoading;

export const selectProfileOrders = (state: RootState) =>
  state.orders.profileOrders;
export const selectProfileOrdersLoading = (state: RootState) =>
  state.orders.isProfileOrdersLoading;

export const selectOrderData = (state: RootState) => state.orders.orderData;
export const selectOrderLoading = (state: RootState) =>
  state.orders.isOrderLoading;
