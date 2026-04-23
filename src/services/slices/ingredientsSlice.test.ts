import ingredientsReducer, { fetchIngredients } from './ingredientsSlice';
import { TIngredient } from '@utils-types';

const ingredientsMock: TIngredient[] = [
  {
    _id: 'ingredient-id-1',
    name: 'Краторная булка',
    type: 'bun',
    proteins: 10,
    fat: 10,
    carbohydrates: 10,
    calories: 10,
    price: 200,
    image: 'image',
    image_mobile: 'image-mobile',
    image_large: 'image-large'
  }
];

describe('ingredientsSlice reducer', () => {
  it('должен устанавливать isLoading=true при fetchIngredients.pending', () => {
    const state = ingredientsReducer(undefined, fetchIngredients.pending('', undefined));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные и isLoading=false при fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.fulfilled(ingredientsMock, '', undefined)
    );

    expect(state.items).toEqual(ingredientsMock);
    expect(state.isLoading).toBe(false);
  });

  it('должен сохранять ошибку и isLoading=false при fetchIngredients.rejected', () => {
    const errorMessage = 'Ошибка получения ингредиентов';
    const state = ingredientsReducer(
      undefined,
      fetchIngredients.rejected(new Error(errorMessage), '', undefined)
    );

    expect(state.error).toBe(errorMessage);
    expect(state.isLoading).toBe(false);
  });
});