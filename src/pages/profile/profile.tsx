import { ProfileUI } from '@ui-pages';
import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from 'react';

import {
  selectUser,
  updateUser,
  selectUserError,
} from '../../services/slices/user-slice';
import { useDispatch, useSelector } from '../../services/store';

export const Profile = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectUserError);

  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  });

  useEffect(() => {
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    });
  }, [user]);

  const isFormChanged =
    formValue.name !== (user?.name ?? '') ||
    formValue.email !== (user?.email ?? '') ||
    Boolean(formValue.password);

  const handleSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    const { name, email, password } = formValue;
    void dispatch(updateUser(password ? { name, email, password } : { name, email }));
  };

  const handleCancel = (event: SyntheticEvent): void => {
    event.preventDefault();
    setFormValue({
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: '',
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFormValue((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={error ?? undefined}
    />
  );
};
