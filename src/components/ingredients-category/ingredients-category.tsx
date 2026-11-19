import { IngredientsCategoryUI } from '@ui';
import { useMemo } from 'react';

import { selectConstructorItems } from '../../services/slices/constructor-slice';
import { useSelector } from '../../services/store';

import type { TIngredientsCategoryProps } from './type';

const BUN_COUNT = 2;

export const IngredientsCategory = ({
  title,
  titleRef,
  ingredients,
  ref,
}: TIngredientsCategoryProps): React.JSX.Element => {
  const constructorItems = useSelector(selectConstructorItems);
  const ingredientsCounters = useMemo(() => {
    const counters: Record<string, number> = {};
    constructorItems.ingredients.forEach((item) => {
      counters[item._id] = (counters[item._id] ?? 0) + 1;
    });
    if (constructorItems.bun) counters[constructorItems.bun._id] = BUN_COUNT;
    return counters;
  }, [constructorItems]);
  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
};
