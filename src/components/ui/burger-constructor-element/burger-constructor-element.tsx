import {
  ConstructorElement,
  MoveButton,
} from '@krgaa/react-developer-burger-ui-components';

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
    <MoveButton
      isUpDisabled={index === 0}
      isDownDisabled={index === totalItems - 1}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
    />

    <ConstructorElement
      text={ingredient.name}
      price={ingredient.price}
      thumbnail={ingredient.image}
      handleClose={handleClose}
    />
  </div>
);
