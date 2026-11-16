import type { RootState } from '../store';

export const selectOrderByNumber = (orderNumber: number) => (state: RootState) =>
  state.feed.orders.find((order) => order.number === orderNumber) ??
  state.feed.userOrders.find((order) => order.number === orderNumber) ??
  (state.order.orderByNumber?.number === orderNumber ? state.order.orderByNumber : null);