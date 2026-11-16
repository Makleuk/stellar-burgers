import { FeedInfoUI } from '@ui';
import type { TOrder } from '@utils-types';
import type { FC } from 'react';

import {
  selectFeedOrders,
  selectFeedTotal,
  selectFeedTotalToday,
} from '../../services/slices/feed-slice';
import { useSelector } from '../../services/store';

const MAX_ORDERS_IN_COLUMN = 20;

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, MAX_ORDERS_IN_COLUMN);

export const FeedInfo: FC = () => {
  const orders = useSelector(selectFeedOrders);
  const total = useSelector(selectFeedTotal);
  const totalToday = useSelector(selectFeedTotalToday);
  const feed = { total, totalToday };

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return <FeedInfoUI readyOrders={readyOrders} pendingOrders={pendingOrders} feed={feed} />;
};