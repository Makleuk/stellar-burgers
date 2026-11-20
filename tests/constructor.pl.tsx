
import { expect, test } from '@playwright/test';
import path from 'node:path';

const harPath = path.resolve(process.cwd(), 'tests/hars/constructor.har');

test.describe('Конструктор бургера', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR(harPath, {
      url: '**/api/**',
      notFound: 'abort'
    });

    await page.context().addInitScript(() => {
      window.localStorage.setItem('refreshToken', 'mock-refresh-token');
      document.cookie = 'accessToken=Bearer%20mock-access-token; path=/';
    });

    await page.goto('/');

    await expect(
      page.getByRole('heading', { name: 'Соберите бургер' })
    ).toBeVisible();
  });

  test('добавляет булку и начинку в конструктор', async ({ page }) => {
    const constructor = page.getByTestId('burger-constructor');
    const addButtons = page.getByRole('button', { name: 'Добавить' });

    await addButtons.nth(0).click();
    await addButtons.nth(2).click();

    await expect(
      constructor.getByText('Краторная булка N-200i (верх)', { exact: true })
    ).toBeVisible();

    await expect(
      constructor.getByText('Краторная булка N-200i (низ)', { exact: true })
    ).toBeVisible();

    await expect(
      constructor.getByText(
        'Мясо бессмертных моллюсков Protostomia',
        { exact: true }
      )
    ).toBeVisible();
  });

  test('открывает модальное окно выбранного ингредиента и закрывает его крестиком', async ({ page }) => {
    await page.getByRole('link', { name: /Краторная булка N-200i/ }).click();

    const ingredientModal = page.getByTestId('ingredient-modal');

    await expect(ingredientModal).toBeVisible();

    await expect(
      ingredientModal.getByRole('heading', {
        name: 'Краторная булка N-200i'
      })
    ).toBeVisible();

    await expect(
      ingredientModal.getByText('Калории, ккал')
    ).toBeVisible();

    await ingredientModal.getByRole('button', { name: 'Закрыть' }).click();

    await expect(ingredientModal).toHaveCount(0);
  });

  test('закрывает модальное окно ингредиента по клику на оверлей', async ({ page }) => {
    await page.getByRole('link', { name: /Краторная булка N-200i/ }).click();

    const ingredientModal = page.getByTestId('ingredient-modal');

    await expect(ingredientModal).toBeVisible();

    await page.locator('[class*="overlay"]').click({
      position: { x: 5, y: 5 }
    });

    await expect(ingredientModal).toHaveCount(0);
  });

  test('создаёт заказ, показывает его номер и очищает конструктор', async ({ page }) => {
    const constructor = page.getByTestId('burger-constructor');
    const addButtons = page.getByRole('button', { name: 'Добавить' });

    await addButtons.nth(0).click();
    await addButtons.nth(2).click();

    await constructor.getByRole('button', { name: 'Оформить заказ' }).click();

    const orderModal = page.getByTestId('order-modal');

    await expect(orderModal).toBeVisible();

    await expect(
      orderModal.getByRole('heading', { name: 'Ваш заказ' })
    ).toBeVisible();

    await expect(
      orderModal.getByText('12345', { exact: true })
    ).toBeVisible();

    await expect(
      constructor.getByText('Выберите булку', { exact: true })
    ).toHaveCount(2);

    await expect(
      constructor.getByText('Добавьте начинку или соус')
    ).toBeVisible();

    await orderModal.getByRole('button', { name: 'Закрыть' }).click();

    await expect(orderModal).toHaveCount(0);
  });
});
