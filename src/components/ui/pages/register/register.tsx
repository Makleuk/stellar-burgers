import {
  Input,
  PasswordInput,
  Button,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import type { RegisterUIProps } from './type';

import styles from '../common.module.css';

export const RegisterUI = ({
  errorText,
  email,
  setEmail,
  password,
  setPassword,
  userName,
  setUserName,
  handleSubmit,
}: RegisterUIProps): React.JSX.Element => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className="pb-6 text text_type_main-medium">Регистрация</h3>
      <form className={`pb-15 ${styles.form}`} onSubmit={handleSubmit}>
        <div className="pb-6">
          <Input
            type="text"
            placeholder="Имя"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            name="name"
          />
        </div>
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
            Зарегистрироваться
          </Button>
        </div>
        {errorText && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorText}
          </p>
        )}
      </form>
      <p className={`${styles.question} text text_type_main-default`}>
        Уже зарегистрированы?{' '}
        <Link to="/login" className={`pl-2 ${styles.link}`}>
          Войти
        </Link>
      </p>
    </div>
  </main>
);
