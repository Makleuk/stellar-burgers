import { BurgerIngredientsUI } from '@ui';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { selectIngredients } from '../../services/slices/ingredients-slice';
import { useSelector } from '../../services/store';

import type { TTabMode } from '@utils-types';

export const BurgerIngredients = (): React.JSX.Element => {
  const ingredients = useSelector(selectIngredients);
  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);
  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewMains] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inViewBuns) setCurrentTab('bun');
    else if (inViewSauces) setCurrentTab('sauce');
    else if (inViewMains) setCurrentTab('main');
  }, [inViewBuns, inViewMains, inViewSauces]);

  const onTabClick = (tab: string): void => {
    setCurrentTab(tab as TTabMode);
    const refs = { bun: titleBunRef, main: titleMainRef, sauce: titleSaucesRef };
    refs[tab as TTabMode]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
