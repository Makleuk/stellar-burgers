import { OrderStatus } from '@components';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import type { OrderCardUIProps } from './type';

import styles from './order-card.module.css';

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long', timeStyle: 'short' }).format(
    date
  );

export const OrderCardUI = ({
  orderInfo,
  locationState,
}: OrderCardUIProps): React.JSX.Element => (
  <Link
    to={`${locationState.background.pathname.startsWith('/profile') ? `/profile/orders/${orderInfo.number}` : `/feed/${orderInfo.number}`}`}
    state={locationState}
    className={`${styles.order} p-6 mb-4`}
  >
    <div className={`${styles.order_info} mb-6`}>
      <span className="text text_type_digits-default">#{orderInfo.number}</span>
      <span className="text text_type_main-default text_color_inactive">
        {formatDate(orderInfo.date)}
      </span>
    </div>
    <h3 className={`${styles.order_name} text text_type_main-medium mb-2`}>
      {orderInfo.name}
    </h3>
    <OrderStatus status={orderInfo.status} />
    <div className={`${styles.order_content} mt-6`}>
      <ul className={styles.ingredients}>
        {orderInfo.ingredientsToShow.map((ingredient, index) => (
          <li
            className={styles.img_wrap}
            key={`${ingredient._id}-${index}`}
            style={{ zIndex: orderInfo.ingredientsToShow.length - index }}
          >
            <img
              className={styles.img}
              src={ingredient.image_mobile}
              alt={ingredient.name}
            />
          </li>
        ))}
        {orderInfo.remains > 0 && (
          <li className={styles.img_wrap}>
            <span className={`${styles.remains} text text_type_main-default`}>
              +{orderInfo.remains}
            </span>
          </li>
        )}
      </ul>
      <div className={styles.order_total}>
        <span className="text text_type_digits-default mr-2">{orderInfo.total}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  </Link>
);
