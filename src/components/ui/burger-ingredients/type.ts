import type { TIngredient, TTabMode } from '@utils-types';
import type { RefCallback, RefObject } from 'react';

export type BurgerIngredientsUIProps = {
  currentTab: TTabMode;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  titleBunRef: RefObject<HTMLHeadingElement | null>;
  titleMainRef: RefObject<HTMLHeadingElement | null>;
  titleSaucesRef: RefObject<HTMLHeadingElement | null>;
  bunsRef: RefCallback<Element>;
  mainsRef: RefCallback<Element>;
  saucesRef: RefCallback<Element>;
  onTabClick: (val: string) => void;
};
