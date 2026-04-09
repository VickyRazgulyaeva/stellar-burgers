import { combineReducers } from '@reduxjs/toolkit';
import ingredients from './ingredientsSlice';
import burgerConstructor from './constructorSlice';
import user from './userSlice';
import orders from './ordersSlice';

export const rootReducer = combineReducers({
  ingredients,
  burgerConstructor,
  user,
  orders
});
