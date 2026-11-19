import { AppHeaderUI } from '@ui';

import { selectUser } from '../../services/slices/user-slice';
import { useSelector } from '../../services/store';

import type { FC } from 'react';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  return <AppHeaderUI userName={user?.name} />;
};
