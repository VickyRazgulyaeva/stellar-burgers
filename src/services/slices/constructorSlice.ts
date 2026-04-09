import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from '../store';

type TConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: { number: number } | null;
  error: string | null;
};

const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null,
  error: null
};

export const createOrder = createAsyncThunk<
  { number: number },
  void,
  { state: RootState }
>('constructor/createOrder', async (_, { getState }) => {
  const { bun, ingredients } = getState().burgerConstructor.constructorItems;
  const ids = [
    bun?._id,
    ...ingredients.flatMap((item) => Array(item.count).fill(item._id)),
    bun?._id
  ].filter(Boolean) as string[];
  const response = await orderBurgerApi(ids);
  return { number: response.order.number };
});

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          const existingIngredient = state.constructorItems.ingredients.find(
            (item) => item._id === action.payload._id
          );

          if (existingIngredient) {
            existingIngredient.count += 1;
          } else {
            state.constructorItems.ingredients.push(action.payload);
          }
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: {
          ...ingredient,
          count: 1
        }
      })
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      const ingredient = state.constructorItems.ingredients.find(
        (item) => item._id === action.payload
      );

      if (!ingredient) return;

      if (ingredient.count > 1) {
        ingredient.count -= 1;
        return;
      }

      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item._id !== action.payload
        );
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index <= 0) return;
      const items = state.constructorItems.ingredients;
      [items[index - 1], items[index]] = [items[index], items[index - 1]];
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      const items = state.constructorItems.ingredients;
      if (index >= items.length - 1) return;
      [items[index], items[index + 1]] = [items[index + 1], items[index]];
    },
    closeOrderModal: (state) => {
      state.orderModalData = null;
    },
    clearConstructor: (state) => {
      state.constructorItems = initialState.constructorItems;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
        state.constructorItems = initialState.constructorItems;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  closeOrderModal,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
