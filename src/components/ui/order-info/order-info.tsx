import { OrderInfoUI, Preloader } from '@ui';
import type { TIngredient } from '@utils-types';
import { useEffect, useMemo, type FC } from 'react';
import { useParams } from 'react-router-dom';

import { selectOrderByNumber } from '../../services/selectors/order-selectors';
import { selectIngredients } from '../../services/slices/ingredients-slice';
import { fetchOrderByNumber } from '../../services/slices/order-slice';
import { useDispatch, useSelector } from '../../services/store';

type TIngredientsWithCount = Record<string, TIngredient & { count: number }>;

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const orderNumber = Number(number);
  const orderData = useSelector(selectOrderByNumber(orderNumber));
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    if (!orderData) {
      dispatch(fetchOrderByNumber(orderNumber));
    }
  }, [dispatch, orderData, orderNumber]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);
    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, itemId) => {
        if (acc[itemId]) {
          acc[itemId].count++;
        } else {
          const ingredient = ingredients.find((item) => item._id === itemId);
          if (ingredient) {
            acc[itemId] = { ...ingredient, count: 1 };
          }
        }
        return acc;
      },
      {}
    );
    const total = Object.values(ingredientsInfo).reduce(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return { ...orderData, ingredientsInfo, date, total };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
