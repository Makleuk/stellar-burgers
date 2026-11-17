import { ProfileOrdersUI } from '@ui-pages';
import { useEffect } from 'react';

import {
  fetchUserOrders,
  selectUserOrders,
  selectUserOrdersError,
  selectUserOrdersLoading,
} from '../../services/slices/feed-slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const isLoading = useSelector(selectUserOrdersLoading);
  const error = useSelector(selectUserOrdersError);

  useEffect(() => {
    void dispatch(fetchUserOrders());
  }, [dispatch]);

  if (isLoading && !orders.length)
    return <p className="text text_type_main-default">Загружаем историю заказов…</p>;

  if (error && !orders.length)
    return <p className="text text_type_main-default">{error}</p>;

  return <ProfileOrdersUI orders={orders} />;
};
