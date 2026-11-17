import { OrderStatus } from '@components';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import type { OrderInfoUIProps } from './type';

import styles from './order-info.module.css';

const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long', timeStyle: 'short' }).format(
    date
  );

export const OrderInfoUI = ({ orderInfo }: OrderInfoUIProps): React.JSX.Element => (
  <article className={`${styles.wrap} pt-4`}>
    <p className="text text_type_digits-default mb-10">#{orderInfo.number}</p>
    <h2 className={`${styles.header} text text_type_main-medium mb-3`}>
      {orderInfo.name}
    </h2>
    <OrderStatus status={orderInfo.status} />
    <h3 className="text text_type_main-medium mt-10 mb-6">Состав:</h3>
    <ul className={styles.list}>
      {Object.entries(orderInfo.ingredientsInfo).map(([id, ingredient]) => (
        <li className={`${styles.item} mb-4`} key={id}>
          <div className={styles.img_wrap}>
            <div className={styles.border}>
              <img
                className={styles.img}
                src={ingredient.image_mobile}
                alt={ingredient.name}
              />
            </div>
          </div>
          <span className="text text_type_main-default ml-4">{ingredient.name}</span>
          <span className={`${styles.quantity} text text_type_digits-default`}>
            {ingredient.count} × {ingredient.price}
          </span>
        </li>
      ))}
    </ul>
    <div className={`${styles.bottom} mt-10`}>
      <span className="text text_type_main-default text_color_inactive">
        {formatDate(orderInfo.date)}
      </span>
      <div className={styles.total}>
        <span className="text text_type_digits-default mr-2">{orderInfo.total}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  </article>
);
