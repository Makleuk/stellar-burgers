import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import { createOrder } from './order-slice';

import type { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

type TMovePayload = { from: number; to: number };

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() },
      }),
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (state, action: PayloadAction<TMovePayload>) => {
      const { from, to } = action.payload;
      if (
        from < 0 ||
        from >= state.ingredients.length ||
        to < 0 ||
        to >= state.ingredients.length ||
        from === to
      )
        return;
      const [movedIngredient] = state.ingredients.splice(from, 1);
      if (movedIngredient) state.ingredients.splice(to, 0, movedIngredient);
    },
    clearConstructor: () => initialState,
  },
  selectors: {
    selectConstructorItems: (state) => state,
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.fulfilled, () => initialState);
  },
});

export const { addIngredient, removeIngredient, moveIngredient, clearConstructor } =
  constructorSlice.actions;
export const { selectConstructorItems } = constructorSlice.selectors;
