import { ConstructorElement } from '@krgaa/react-developer-burger-ui-components';

import type { BurgerConstructorElementUIProps } from './type';

import styles from './burger-constructor-element.module.css';

export const BurgerConstructorElementUI = ({
  ingredient,
  index,
  totalItems,
  handleMoveUp,
  handleMoveDown,
  handleClose,
}: BurgerConstructorElementUIProps): React.JSX.Element => (
  <div className={styles.element_fullwidth}>
    <div
      className="pl-2 pr-2 mb-2"
      style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}
    >
      <button
        type="button"
        aria-label="Переместить выше"
        disabled={index === 0}
        onClick={handleMoveUp}
      >
        ↑
      </button>
      <button
        type="button"
        aria-label="Переместить ниже"
        disabled={index === totalItems - 1}
        onClick={handleMoveDown}
      >
        ↓
      </button>
    </div>
    <ConstructorElement
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      handleClose={handleClose}
    />
  </div>
);
