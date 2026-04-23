import constructorReducer, {
  addIngredient,
  moveIngredientUp,
  removeIngredient
} from './constructorSlice';
import { TIngredient } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun-id',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 10,
  price: 100,
  image: 'image',
  image_mobile: 'image-mobile',
  image_large: 'image-large'
};

const mainA: TIngredient = {
  _id: 'main-id-a',
  name: 'Начинка A',
  type: 'main',
  proteins: 10,
  fat: 10,
  carbohydrates: 10,
  calories: 10,
  price: 50,
  image: 'image',
  image_mobile: 'image-mobile',
  image_large: 'image-large'
};

const mainB: TIngredient = {
  ...mainA,
  _id: 'main-id-b',
  name: 'Начинка B'
};

describe('constructorSlice reducer', () => {
  it('должен обрабатывать добавление ингредиентов', () => {
    let state = constructorReducer(undefined, addIngredient(bun));
    state = constructorReducer(state, addIngredient(mainA));

    expect(state.constructorItems.bun?._id).toBe(bun._id);
    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]._id).toBe(mainA._id);
    expect(state.constructorItems.ingredients[0].id).toBeDefined();
  });

  it('должен обрабатывать удаление ингредиента', () => {
    let state = constructorReducer(undefined, addIngredient(mainA));
    state = constructorReducer(state, addIngredient(mainB));

    const ingredientIdToRemove = state.constructorItems.ingredients[0].id;
    state = constructorReducer(state, removeIngredient(ingredientIdToRemove));

    expect(state.constructorItems.ingredients).toHaveLength(1);
    expect(state.constructorItems.ingredients[0]._id).toBe(mainB._id);
  });

  it('должен менять порядок ингредиентов в начинке', () => {
    let state = constructorReducer(undefined, addIngredient(mainA));
    state = constructorReducer(state, addIngredient(mainB));

    state = constructorReducer(state, moveIngredientUp(1));

    expect(state.constructorItems.ingredients[0]._id).toBe(mainB._id);
    expect(state.constructorItems.ingredients[1]._id).toBe(mainA._id);
  });
});