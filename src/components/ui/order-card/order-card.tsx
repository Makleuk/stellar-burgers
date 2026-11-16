import { OrderCardUI } from '@ui';
import type { TIngredient } from '@utils-types';
import { memo, useMemo, type FC } from 'react';
import { useLocation } from 'react-router-dom';

import { selectIngredients } from '../../services/slices/ingredients-slice';
import { useSelector } from '../../services/store';
import type { TOrderCardProps } from './type';

const maxIngredients = 6;

export const OrderCard: FC<TOrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);

  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;

    const ingredientsInfo = order.ingredients.reduce((acc: TIngredient[], itemId) => {
      const ingredient = ingredients.find((item) => item._id === itemId);
      return ingredient ? [...acc, ingredient] : acc;
    }, []);
    const total = ingredientsInfo.reduce((sum, item) => sum + item.price, 0);
    const ingredientsToShow = ingredientsInfo.slice(0, maxIngredients);
    const remains =
      ingredientsInfo.length > maxIngredients ? ingredientsInfo.length - maxIngredients : 0;
    const date = new Date(order.createdAt);

    return { ...order, ingredientsInfo, ingredientsToShow, remains, total, date };
  }, [order, ingredients]);

  if (!orderInfo) return null;

  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={maxIngredients}
      locationState={{ background: location }}
    />
  );
});