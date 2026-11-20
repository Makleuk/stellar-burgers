import { BurgerConstructorElement, Modal } from '@components';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { OrderDetailsUI } from '@ui';

import type { BurgerConstructorUIProps } from './type';

import styles from './burger-constructor.module.css';

export const BurgerConstructorUI = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  error,
  onOrderClick,
  closeOrderModal,
}: BurgerConstructorUIProps): React.JSX.Element => (
  <section
    className={`${styles.burger_constructor} pl-4`}
    data-testid="burger-constructor"
  >
    <div className={`${styles.element} mb-4`}>
      {constructorItems.bun ? (
        <ConstructorElement
          type="top"
          isLocked
          text={`${constructorItems.bun.name} (верх)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      ) : (
        <div className={`${styles.noBuns} ${styles.noBunsTop}`}>Выберите булку</div>
      )}
    </div>
    <ul className={`${styles.elements} custom-scroll`}>
      {constructorItems.ingredients.map((ingredient, index) => (
        <li className={`${styles.element} mb-4`} key={ingredient.id}>
          <BurgerConstructorElement
            ingredient={ingredient}
            index={index}
            totalItems={constructorItems.ingredients.length}
          />
        </li>
      ))}
      {!constructorItems.ingredients.length && (
        <li className={`${styles.noBuns} mb-4`}>Добавьте начинку или соус</li>
      )}
    </ul>
    <div className={`${styles.element} mt-4`}>
      {constructorItems.bun ? (
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${constructorItems.bun.name} (низ)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      ) : (
        <div className={`${styles.noBuns} ${styles.noBunsBottom}`}>Выберите булку</div>
      )}
    </div>
    {error && (
      <p className="text text_type_main-default mt-4" role="alert">
        {error}
      </p>
    )}
    <div className={`${styles.total} mt-10 mr-4`}>
      <div className={`${styles.cost} mr-10`}>
        <span className={`${styles.text} mr-2`}>{price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        disabled={!constructorItems.bun || orderRequest}
        onClick={onOrderClick}
      >
        {orderRequest ? 'Оформляем…' : 'Оформить заказ'}
      </Button>
    </div>
    {orderModalData && (
      <Modal title="Ваш заказ" onClose={closeOrderModal} testId="order-modal">
        <OrderDetailsUI orderNumber={orderModalData.number} />
      </Modal>
    )}
  </section>
);
