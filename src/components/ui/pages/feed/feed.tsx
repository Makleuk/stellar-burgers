import { OrdersList, FeedInfo } from '@components';

import type { FeedUIProps } from './type';

import styles from './feed.module.css';

export const FeedUI = ({ orders, handleGetFeeds }: FeedUIProps): React.JSX.Element => (
  <main className={styles.containerMain}>
    <div className={`${styles.titleBox} mt-10 mb-5`}>
      <h1 className="text text_type_main-large">Лента заказов</h1>
      <button
        type="button"
        className="ml-6 text text_type_main-default"
        onClick={handleGetFeeds}
      >
        Обновить
      </button>
    </div>
    <div className={styles.main}>
      <section className={`${styles.columnOrders} custom-scroll pr-2`}>
        <OrdersList orders={orders} />
      </section>
      <section className={`${styles.columnInfo} pl-4`}>
        <FeedInfo />
      </section>
    </div>
  </main>
);
