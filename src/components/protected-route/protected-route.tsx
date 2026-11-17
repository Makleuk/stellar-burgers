import { Preloader } from '@ui';
import { Navigate, useLocation, type Location } from 'react-router-dom';

import { selectIsAuthChecked, selectUser } from '../../services/slices/user-slice';
import { useSelector } from '../../services/store';

import type { ReactElement } from 'react';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: ReactElement;
};

type TLocationState = { from?: Location } | null;

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: TProtectedRouteProps): React.JSX.Element => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const from = (location.state as TLocationState)?.from ?? { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return <>{children}</>;
};
