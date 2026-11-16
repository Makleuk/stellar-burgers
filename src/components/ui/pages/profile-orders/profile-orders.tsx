import { ProfileOrdersUI } from '@ui-pages';
import { useEffect, type FC } from 'react';

import { fetchUserOrders, selectUserOrders } from '../../services/slices/feed-slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};