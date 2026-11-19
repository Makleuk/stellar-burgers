import { OrderCardUI } from '@ui';
import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { selectIngredients } from '../../services/slices/ingredients-slice';
import { useSelector } from '../../services/store';

import type { OrderCardProps } from './type';
import type { TIngredient } from '@utils-types';

const MAX_INGREDIENTS = 6;

export const OrderCard = memo(function OrderCard({
  order,
}: OrderCardProps): React.JSX.Element | null {
  const location = useLocation();
  const ingredients = useSelector(selectIngredients);
  const orderInfo = useMemo(() => {
    if (!ingredients.length) return null;
    const ingredientsInfo = order.ingredients.reduce((result: TIngredient[], id) => {
      const ingredient = ingredients.find((item) => item._id === id);
      if (ingredient) result.push(ingredient);
      return result;
    }, []);
    const total = ingredientsInfo.reduce((sum, item) => sum + item.price, 0);
    return {
      ...order,
      ingredientsInfo,
      ingredientsToShow: ingredientsInfo.slice(0, MAX_INGREDIENTS),
      remains: Math.max(0, ingredientsInfo.length - MAX_INGREDIENTS),
      total,
      date: new Date(order.createdAt),
    };
  }, [order, ingredients]);
  if (!orderInfo) return null;
  return (
    <OrderCardUI
      orderInfo={orderInfo}
      maxIngredients={MAX_INGREDIENTS}
      locationState={{ background: location }}
    />
  );
});
