import { OrdersList, ProfileMenu } from '@components';

import type { ProfileOrdersUIProps } from './type';

import styles from './profile-orders.module.css';

export const ProfileOrdersUI = ({ orders }: ProfileOrdersUIProps): React.JSX.Element => (
  <main className={styles.main}>
    <aside className={`${styles.menu} mr-15`}>
      <ProfileMenu />
    </aside>
    <section className={`${styles.orders} custom-scroll`}>
      <OrdersList orders={orders} />
    </section>
  </main>
);
