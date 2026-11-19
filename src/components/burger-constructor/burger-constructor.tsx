import { BurgerConstructorUI } from '@ui';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { selectConstructorItems } from '../../services/slices/constructor-slice';
import {
  createOrder,
  resetOrderModal,
  selectOrderError,
  selectOrderModalData,
  selectOrderRequest,
} from '../../services/slices/order-slice';
import { selectUser } from '../../services/slices/user-slice';
import { useDispatch, useSelector } from '../../services/store';

const BUN_COUNT = 2;

export const BurgerConstructor = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const error = useSelector(selectOrderError);
  const user = useSelector(selectUser);

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * BUN_COUNT : 0) +
      constructorItems.ingredients.reduce((sum, item) => sum + item.price, 0),
    [constructorItems]
  );

  const onOrderClick = (): void => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      void navigate('/login', { state: { from: { pathname: '/' } } });
      return;
    }

    const ingredientIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id,
    ];

    void dispatch(createOrder(ingredientIds));
  };

  const closeOrderModal = (): void => {
    dispatch(resetOrderModal());
  };

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      error={error}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
