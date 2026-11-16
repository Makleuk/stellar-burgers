import { forwardRef, useMemo } from 'react';

import { selectConstructorItems } from '../../services/slices/constructor-slice';
import { useSelector } from '../../services/store';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import type { TIngredientsCategoryProps } from './type';

const BUN_COUNT = 2;

export const IngredientsCategory = forwardRef<HTMLUListElement, TIngredientsCategoryProps>(
  ({ title, titleRef, ingredients }, ref) => {
    const burgerConstructor = useSelector(selectConstructorItems);

    const ingredientsCounters = useMemo(() => {
      const counters: Record<string, number> = {};
      burgerConstructor.ingredients.forEach((ingredient) => {
        counters[ingredient._id] = (counters[ingredient._id] ?? 0) + 1;
      });
      if (burgerConstructor.bun) {
        counters[burgerConstructor.bun._id] = BUN_COUNT;
      }
      return counters;
    }, [burgerConstructor]);

    return (
      <IngredientsCategoryUI
        title={title}
        titleRef={titleRef}
        ingredients={ingredients}
        ingredientsCounters={ingredientsCounters}
        ref={ref}
      />
    );
  }
);