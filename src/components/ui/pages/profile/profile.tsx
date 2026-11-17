import { ProfileMenu } from '@components';
import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';

import type { ProfileUIProps } from './type';

import styles from './profile.module.css';

export const ProfileUI = ({
  formValue,
  isFormChanged,
  handleSubmit,
  handleCancel,
  handleInputChange,
  updateUserError,
}: ProfileUIProps): React.JSX.Element => (
  <main className={styles.container}>
    <aside className={styles.menu}>
      <ProfileMenu />
    </aside>
    <section className="pt-10">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Имя"
            value={formValue.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>
        <div className="mb-6">
          <Input
            type="email"
            placeholder="Логин"
            value={formValue.email}
            onChange={handleInputChange}
            name="email"
          />
        </div>
        <div className="mb-6">
          <PasswordInput
            value={formValue.password}
            onChange={handleInputChange}
            name="password"
          />
        </div>
        {updateUserError && (
          <p className={`${styles.error} text text_type_main-default mb-4`}>
            {updateUserError}
          </p>
        )}
        {isFormChanged && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={handleCancel}
            >
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        )}
      </form>
    </section>
  </main>
);
