import { FeedInfoUI } from '@ui';

import {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday,
} from '../../services/slices/feed-slice';
import { useSelector } from '../../services/store';

import type { TOrder } from '@utils-types';

const MAX_ORDERS = 20;
const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((order) => order.status === status)
    .map((order) => order.number)
    .slice(0, MAX_ORDERS);

export const FeedInfo = (): React.JSX.Element => {
  const orders = useSelector(selectFeedOrders);
  const total = useSelector(selectFeedTotal);
  const totalToday = useSelector(selectFeedTotalToday);
  return (
    <FeedInfoUI
      readyOrders={getOrders(orders, 'done')}
      pendingOrders={getOrders(orders, 'pending')}
      feed={{ orders, total, totalToday, isLoading: false, error: null }}
    />
  );
};
