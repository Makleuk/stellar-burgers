import { OrderInfoUI, Preloader } from '@ui';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { selectOrderByNumber } from '../../services/selectors/order-selectors';
import { selectIngredients } from '../../services/slices/ingredients-slice';
import {
  fetchOrderByNumber,
  selectOrderLoading,
  selectOrderError,
} from '../../services/slices/order-slice';
import { useDispatch, useSelector } from '../../services/store';

import type { TIngredient } from '@utils-types';

type TIngredientsWithCount = Record<string, TIngredient & { count: number }>;

export const OrderInfo = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { number } = useParams();
  const orderNumber = Number(number);
  const orderData = useSelector(selectOrderByNumber(orderNumber));
  const ingredients = useSelector(selectIngredients);
  const isLoading = useSelector(selectOrderLoading);
  const error = useSelector(selectOrderError);

  useEffect(() => {
    if (Number.isFinite(orderNumber) && orderNumber > 0 && !orderData) {
      void dispatch(fetchOrderByNumber(orderNumber));
    }
  }, [dispatch, orderData, orderNumber]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const ingredientsInfo = orderData.ingredients.reduce(
      (result: TIngredientsWithCount, id) => {
        const existing = result[id];

        if (existing) existing.count += 1;
        else {
          const ingredient = ingredients.find((item) => item._id === id);
          if (ingredient) result[id] = { ...ingredient, count: 1 };
        }

        return result;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce<number>(
      (sum, item) => sum + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date: new Date(orderData.createdAt),
      total,
    };
  }, [orderData, ingredients]);

  if (!orderInfo)
    return (
      <>
        {isLoading ? (
          <Preloader />
        ) : error ? (
          <p className="text text_type_main-default">{error}</p>
        ) : (
          <Preloader />
        )}
      </>
    );

  return <OrderInfoUI orderInfo={orderInfo} />;
};
