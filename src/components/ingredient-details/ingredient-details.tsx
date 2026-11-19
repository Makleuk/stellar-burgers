import { IngredientDetailsUI, Preloader } from '@ui';
import { useParams } from 'react-router-dom';

import {
  selectIngredients,
  selectIngredientsLoading,
} from '../../services/slices/ingredients-slice';
import { useSelector } from '../../services/store';

export const IngredientDetails = (): React.JSX.Element => {
  const { id } = useParams();
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectIngredientsLoading);
  const ingredientData = ingredients.find((item) => item._id === id);
  if (!ingredientData)
    return isLoading ? (
      <Preloader />
    ) : (
      <p className="text text_type_main-medium">Ингредиент не найден</p>
    );
  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
