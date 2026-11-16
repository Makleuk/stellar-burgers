import { BurgerIngredientUI } from '@ui';
import { memo, type FC } from 'react';
import { useLocation } from 'react-router-dom';

import { addIngredient } from '../../services/slices/constructor-slice';
import { useDispatch } from '../../services/store';
import type { TBurgerIngredientProps } from './type';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);