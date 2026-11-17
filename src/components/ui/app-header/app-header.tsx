import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink } from 'react-router-dom';

import type { TAppHeaderUIProps } from './type';
import type { FC } from 'react';

import styles from './app-header.module.css';

const getTextClassName = (isActive: boolean): string =>
  `text text_type_main-default ml-2 ${isActive ? '' : 'text_color_inactive'}`;

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to="/" end className={`${styles.link} mr-10`}>
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className={getTextClassName(isActive)}>Конструктор</p>
            </>
          )}
        </NavLink>
        <NavLink to="/feed" className={styles.link}>
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p className={getTextClassName(isActive)}>Лента заказов</p>
            </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <NavLink to="/">
          <Logo className="" />
        </NavLink>
      </div>
      <NavLink to="/profile" className={styles.link_position_last}>
        {({ isActive }) => (
          <>
            <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
            <p className={getTextClassName(isActive)}>{userName ?? 'Личный кабинет'}</p>
          </>
        )}
      </NavLink>
    </nav>
  </header>
);
