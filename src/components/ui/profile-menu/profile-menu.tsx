import { NavLink } from 'react-router-dom';

import type { ProfileMenuUIProps } from './type';

import styles from './profile-menu.module.css';

export const ProfileMenuUI = ({
  pathname,
  handleLogout,
}: ProfileMenuUIProps): React.JSX.Element => (
  <nav className="mr-15">
    <NavLink
      to="/profile"
      end
      className={({ isActive }) =>
        `${styles.link} text text_type_main-medium pt-4 pb-4 ${isActive ? styles.link_active : ''}`
      }
    >
      Профиль
    </NavLink>
    <NavLink
      to="/profile/orders"
      className={({ isActive }) =>
        `${styles.link} text text_type_main-medium pt-4 pb-4 ${isActive || pathname.startsWith('/profile/orders/') ? styles.link_active : ''}`
      }
    >
      История заказов
    </NavLink>
    <button
      type="button"
      onClick={handleLogout}
      className={`${styles.button} text text_type_main-medium pt-4 pb-4`}
    >
      Выход
    </button>
    <p className="text text_type_main-default text_color_inactive mt-20">
      В этом разделе вы можете изменить свои персональные данные
    </p>
  </nav>
);
