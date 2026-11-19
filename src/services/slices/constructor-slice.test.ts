import { describe, expect, it } from '@jest/globals';

import {
  addIngredient,
  clearConstructor,
  constructorSlice,
  moveIngredient,
  removeIngredient,
} from './constructor-slice';
import { createOrder } from './order-slice';

import type { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

const bun: TIngredient = {
  _id: 'bun-1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'bun.png',
  image_mobile: 'bun-mobile.png',
  image_large: 'bun-large.png',
};

const filling: TIngredient = {
  _id: 'filling-1',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'filling.png',
  image_mobile: 'filling-mobile.png',
  image_large: 'filling-large.png',
};

const secondFilling: TConstructorIngredient = {
  ...filling,
  _id: 'filling-2',
  id: 'constructor-filling-2',
  name: 'Соус фирменный',
};

const firstFilling: TConstructorIngredient = {
  ...filling,
  id: 'constructor-filling-1',
};

const mockOrder: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Космический бургер',
  createdAt: '2026-01-01T10:00:00.000Z',
  updatedAt: '2026-01-01T10:00:00.000Z',
  number: 12345,
  ingredients: ['bun-1', 'filling-1', 'bun-1'],
};

describe('constructorSlice reducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    expect(constructorSlice.reducer(undefined, { type: 'UNKNOWN' })).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it('добавляет булку и сохраняет её в свойстве bun', () => {
    const state = constructorSlice.reducer(undefined, addIngredient(bun));

    expect(state.bun).toEqual(expect.objectContaining(bun));
    expect(state.bun?.id).toEqual(expect.any(String));
    expect(state.ingredients).toEqual([]);
  });

  it('добавляет начинку в массив ingredients', () => {
    const state = constructorSlice.reducer(undefined, addIngredient(filling));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual(expect.objectContaining(filling));
    expect(state.ingredients[0].id).toEqual(expect.any(String));
  });

  it('удаляет начинку по её id', () => {
    const previousState = {
      bun: null,
      ingredients: [firstFilling, secondFilling],
    };

    const state = constructorSlice.reducer(
      previousState,
      removeIngredient(firstFilling.id)
    );

    expect(state.ingredients).toEqual([secondFilling]);
  });

  it('перемещает начинку на указанную позицию', () => {
    const previousState = {
      bun: null,
      ingredients: [firstFilling, secondFilling],
    };

    const state = constructorSlice.reducer(
      previousState,
      moveIngredient({ from: 0, to: 1 })
    );

    expect(state.ingredients).toEqual([secondFilling, firstFilling]);
  });

  it('не изменяет массив при некорректных индексах перемещения', () => {
    const previousState = {
      bun: null,
      ingredients: [firstFilling, secondFilling],
    };

    const state = constructorSlice.reducer(
      previousState,
      moveIngredient({ from: -1, to: 5 })
    );

    expect(state.ingredients).toEqual([firstFilling, secondFilling]);
  });

  it('очищает конструктор по экшену clearConstructor', () => {
    const previousState = {
      bun: { ...bun, id: 'bun-constructor-id' },
      ingredients: [firstFilling],
    };

    expect(constructorSlice.reducer(previousState, clearConstructor())).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it('очищает конструктор после успешного создания заказа', () => {
    const previousState = {
      bun: { ...bun, id: 'bun-constructor-id' },
      ingredients: [firstFilling],
    };

    const state = constructorSlice.reducer(
      previousState,
      createOrder.fulfilled(mockOrder, 'request-id', ['bun-1', 'filling-1', 'bun-1'])
    );

    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});
