import type { TIngredient } from '@utils-types';
import type { RefCallback, RefObject } from 'react';

export type TIngredientsCategoryProps = {
  title: string;
  titleRef: RefObject<HTMLHeadingElement | null>;
  ingredients: TIngredient[];
  ref?: RefCallback<Element>;
};
