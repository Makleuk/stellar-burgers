import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useEffect } from 'react';

import {
  fetchFeeds,
  selectFeedError,
  selectFeedLoading,
  selectFeedOrders,
} from '../../services/slices/feed-slice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const orders = useSelector(selectFeedOrders);
  const isLoading = useSelector(selectFeedLoading);
  const error = useSelector(selectFeedError);

  useEffect(() => {
    void dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = (): void => {
    void dispatch(fetchFeeds());
  };

  if (isLoading && !orders.length) return <Preloader />;

  if (error && !orders.length)
    return (
      <p className="text text_type_main-default">
        {error}{' '}
        <button type="button" onClick={handleGetFeeds}>
          Повторить
        </button>
      </p>
    );

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
