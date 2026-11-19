import type { IngredientDetailsUIProps } from './type';

import styles from './ingredient-details.module.css';

export const IngredientDetailsUI = ({
  ingredientData,
}: IngredientDetailsUIProps): React.JSX.Element => {
  const values: { label: string; value: number }[] = [
    { label: 'Калории, ккал', value: ingredientData.calories },
    { label: 'Белки, г', value: ingredientData.proteins },
    { label: 'Жиры, г', value: ingredientData.fat },
    { label: 'Углеводы, г', value: ingredientData.carbohydrates },
  ];
  return (
    <div className={`${styles.content} pb-15`}>
      <img src={ingredientData.image_large} alt={ingredientData.name} />
      <h3 className="text text_type_main-medium mt-4 mb-8">{ingredientData.name}</h3>
      <ul className={styles.nutritional_values}>
        {values.map((item) => (
          <li className={styles.nutritional_value} key={item.label}>
            <span className="text text_type_main-default">{item.label}</span>
            <span className="text text_type_digits-default mt-2">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
