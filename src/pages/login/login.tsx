import { LoginUI } from '@ui-pages';
import { useState, type SyntheticEvent } from 'react';

import { loginUser, selectUserError } from '../../services/slices/user-slice';
import { useDispatch, useSelector } from '../../services/store';

export const Login = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const errorText = useSelector(selectUserError) ?? '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    void dispatch(loginUser({ email, password }));
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
