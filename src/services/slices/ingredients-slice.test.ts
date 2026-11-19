import { describe, expect, it } from '@jest/globals';

import { fetchIngredients, ingredientsSlice } from './ingredients-slice';

import type { TIngredient } from '@utils-types';

const mockIngredients: TIngredient[] = [
  {
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
  },
];

describe('ingredientsSlice reducer', () => {
  it('возвращает начальное состояние при неизвестном экшене', () => {
    expect(ingredientsSlice.reducer(undefined, { type: 'UNKNOWN' })).toEqual({
      ingredients: [],
      isLoading: false,
      error: null,
    });
  });

  it('обрабатывает fetchIngredients.pending и очищает предыдущую ошибку', () => {
    const previousState = {
      ingredients: [],
      isLoading: false,
      error: 'Ошибка загрузки',
    };

    const state = ingredientsSlice.reducer(
      previousState,
      fetchIngredients.pending('request-id', undefined)
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  it('обрабатывает fetchIngredients.fulfilled и сохраняет ингредиенты', () => {
    const state = ingredientsSlice.reducer(
      undefined,
      fetchIngredients.fulfilled(mockIngredients, 'request-id', undefined)
    );

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
    expect(state.error).toBeNull();
  });

  it('обрабатывает fetchIngredients.rejected и сохраняет текст ошибки', () => {
    const state = ingredientsSlice.reducer(
      undefined,
      fetchIngredients.rejected(
        new Error('Ошибка загрузки ингредиентов'),
        'request-id',
        undefined
      )
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ингредиентов');
    expect(state.ingredients).toEqual([]);
  });
});
