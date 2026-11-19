import { IngredientsCategory } from '@components';
import { Tab } from '@krgaa/react-developer-burger-ui-components';

import type { BurgerIngredientsUIProps } from './type';

import styles from './burger-ingredients.module.css';

export const BurgerIngredientsUI = ({
  currentTab,
  buns,
  mains,
  sauces,
  titleBunRef,
  titleMainRef,
  titleSaucesRef,
  bunsRef,
  mainsRef,
  saucesRef,
  onTabClick,
}: BurgerIngredientsUIProps): React.JSX.Element => (
  <section className={`${styles.burger_ingredients} pr-4`}>
    <nav className={`${styles.menu} mb-10`}>
      <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
        Булки
      </Tab>
      <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
        Соусы
      </Tab>
      <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>
        Начинки
      </Tab>
    </nav>
    <div className={`${styles.content} custom-scroll`}>
      <IngredientsCategory
        title="Булки"
        titleRef={titleBunRef}
        ingredients={buns}
        ref={bunsRef}
      />
      <IngredientsCategory
        title="Соусы"
        titleRef={titleSaucesRef}
        ingredients={sauces}
        ref={saucesRef}
      />
      <IngredientsCategory
        title="Начинки"
        titleRef={titleMainRef}
        ingredients={mains}
        ref={mainsRef}
      />
    </div>
  </section>
);
