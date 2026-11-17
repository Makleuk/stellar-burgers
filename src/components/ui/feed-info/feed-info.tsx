import type { FeedInfoUIProps } from './type';

import styles from './feed-info.module.css';

export const FeedInfoUI = ({
  readyOrders,
  pendingOrders,
  feed,
}: FeedInfoUIProps): React.JSX.Element => (
  <section>
    <div className={`${styles.columns} mb-15`}>
      <div className={`${styles.column} mr-9`}>
        <h3 className={`${styles.title} text text_type_main-medium mb-6`}>Готовы:</h3>
        <ul className={styles.list}>
          {readyOrders.map((number) => (
            <li
              className={`${styles.list_item} text text_type_digits-default`}
              key={number}
            >
              {number}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.column}>
        <h3 className={`${styles.title} text text_type_main-medium mb-6`}>В работе:</h3>
        <ul className={styles.list}>
          {pendingOrders.map((number) => (
            <li
              className={`${styles.list_item} text text_type_digits-default`}
              key={number}
            >
              {number}
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="mb-15">
      <p className="text text_type_main-medium">Выполнено за всё время:</p>
      <p className="text text_type_digits-large">{feed.total.toLocaleString('ru-RU')}</p>
    </div>
    <div>
      <p className="text text_type_main-medium">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">
        {feed.totalToday.toLocaleString('ru-RU')}
      </p>
    </div>
  </section>
);
