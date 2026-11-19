import {
  Button,
  Counter,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import type { TBurgerIngredientUIProps } from './type';

import styles from './burger-ingredient.module.css';

export const BurgerIngredientUI = ({
  ingredient,
  count,
  locationState,
  handleAdd,
}: TBurgerIngredientUIProps): React.JSX.Element => (
  <article className={`${styles.container} mb-8`}>
    <Link
      to={`/ingredients/${ingredient._id}`}
      state={locationState}
      className={styles.article}
    >
      {count > 0 && <Counter count={count} size="default" />}
      <img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
      <div className={`${styles.cost} mt-1 mb-1`}>
        <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.text} text text_type_main-default`}>{ingredient.name}</p>
    </Link>
    <Button
      htmlType="button"
      type="primary"
      size="small"
      extraClass={`${styles.addButton} mt-2`}
      onClick={handleAdd}
    >
      Добавить
    </Button>
  </article>
);
