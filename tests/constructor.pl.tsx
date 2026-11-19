
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
    const addButtons = page.getByRole('button', { name: 'Добавить' });

    await addButtons.nth(0).click();
    await addButtons.nth(2).click();

    await expect(
      page.getByText('Краторная булка N-200i (верх)', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('Краторная булка N-200i (низ)', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText(
        'Мясо бессмертных моллюсков Protostomia',
        { exact: true }
      ).last()
    ).toBeVisible();
  });

  test('открывает модальное окно с данными выбранного ингредиента и закрывает его крестиком', async ({ page }) => {
    await page.getByRole('link', { name: /Краторная булка N-200i/ }).click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Краторная булка N-200i' })
    ).toBeVisible();

    await expect(page.getByText('Калории, ккал')).toBeVisible();

    await page.getByRole('button', { name: 'Закрыть' }).click();

    await expect(page.getByText('Детали ингредиента')).toHaveCount(0);
  });

  test('закрывает модальное окно ингредиента по клику на оверлей', async ({ page }) => {
    await page.getByRole('link', { name: /Краторная булка N-200i/ }).click();

    await expect(page.getByText('Детали ингредиента')).toBeVisible();

    await page.locator('[class*="overlay"]').click({
      position: { x: 5, y: 5 }
    });

    await expect(page.getByText('Детали ингредиента')).toHaveCount(0);
  });

  test('создаёт заказ, показывает его номер и очищает конструктор', async ({ page }) => {
    const addButtons = page.getByRole('button', { name: 'Добавить' });

    await addButtons.nth(0).click();
    await addButtons.nth(2).click();

    await page.getByRole('button', { name: 'Оформить заказ' }).click();

    await expect(
      page.getByRole('heading', { name: 'Ваш заказ' })
    ).toBeVisible();

    await expect(page.getByText('12345', { exact: true })).toBeVisible();

    await expect(page.getByText('Выберите булку')).toHaveCount(2);

    await expect(
      page.getByText('Добавьте начинку или соус')
    ).toBeVisible();

    await page.getByRole('button', { name: 'Закрыть' }).click();

    await expect(
      page.getByRole('heading', { name: 'Ваш заказ' })
    ).toHaveCount(0);

    await expect(page.getByText('12345', { exact: true })).toHaveCount(0);
  });
});
