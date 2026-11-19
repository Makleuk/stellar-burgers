import { BurgerIngredient } from '@components';
import { forwardRef } from 'react';

import type { TIngredientsCategoryUIProps } from './type';

import styles from './ingredients-category.module.css';

export const IngredientsCategoryUI = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryUIProps
>(({ title, titleRef, ingredients, ingredientsCounters }, ref) => (
  <section className="mb-10">
    <h2 ref={titleRef} className="text text_type_main-medium mb-6">
      {title}
    </h2>
    <ul ref={ref} className={styles.items}>
      {ingredients.map((ingredient) => (
        <li key={ingredient._id}>
          <BurgerIngredient
            ingredient={ingredient}
            count={ingredientsCounters[ingredient._id] ?? 0}
          />
        </li>
      ))}
    </ul>
  </section>
));
IngredientsCategoryUI.displayName = 'IngredientsCategoryUI';
