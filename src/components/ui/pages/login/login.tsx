import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import type { LoginUIProps } from './type';

import styles from '../common.module.css';

export const LoginUI = ({
  errorText,
  email,
  setEmail,
  password,
  setPassword,
  handleSubmit,
}: LoginUIProps): React.JSX.Element => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className="pb-6 text text_type_main-medium">Вход</h3>
      <form className={`pb-15 ${styles.form}`} onSubmit={handleSubmit}>
        <div className="pb-6">
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
          />
        </div>
        <div className="pb-6">
          <PasswordInput
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
          />
        </div>
        <div className={`pb-6 ${styles.button}`}>
          <Button type="primary" size="medium" htmlType="submit">
            Войти
          </Button>
        </div>
        {errorText && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorText}
          </p>
        )}
      </form>
      <p className={`${styles.question} text text_type_main-default pb-6`}>
        Вы — новый пользователь?{' '}
        <Link to="/register" className={`pl-2 ${styles.link}`}>
          Зарегистрироваться
        </Link>
      </p>
      <p className={`${styles.question} text text_type_main-default`}>
        Забыли пароль?{' '}
        <Link to="/forgot-password" className={`pl-2 ${styles.link}`}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  </main>
);
