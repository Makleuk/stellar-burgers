import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  userOrders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  isUserOrdersLoading: boolean;
  error: string | null;
  userOrdersError: string | null;
};

const initialState: TFeedState = {
  orders: [],
  userOrders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  isUserOrdersLoading: false,
  error: null,
  userOrdersError: null,
};

export const fetchFeeds = createAsyncThunk('feed/fetchAll', getFeedsApi);
export const fetchUserOrders = createAsyncThunk('feed/fetchUserOrders', getOrdersApi);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectUserOrders: (state) => state.userOrders,
    selectFeedTotal: (state) => state.total,
    selectFeedTotalToday: (state) => state.totalToday,
    selectFeedLoading: (state) => state.isLoading,
    selectUserOrdersLoading: (state) => state.isUserOrdersLoading,
    selectFeedError: (state) => state.error,
    selectUserOrdersError: (state) => state.userOrdersError,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Не удалось загрузить ленту заказов';
      })
      .addCase(fetchUserOrders.pending, (state) => {
        state.isUserOrdersLoading = true;
        state.userOrdersError = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isUserOrdersLoading = false;
        state.userOrders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isUserOrdersLoading = false;
        state.userOrdersError =
          action.error.message ?? 'Не удалось загрузить историю заказов';
      });
  },
});

export const {
  selectFeedOrders,
  selectUserOrders,
  selectFeedTotal,
  selectFeedTotalToday,
  selectFeedLoading,
  selectUserOrdersLoading,
  selectFeedError,
  selectUserOrdersError,
} = feedSlice.selectors;
