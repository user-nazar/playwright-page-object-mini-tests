import { test, expect } from '@playwright/test';
import { user } from './testdata';
import { HomePage } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';
import { SettingsPage } from '../pages/settings-page';
import { LogoutPage } from '../pages/logout-page';

test('User can login and logout', async ({ page }) => {
  const homepage = new HomePage(page);

  await homepage.open();
  await homepage.goToLoginPage();

  const loginPage = new LoginPage(page);
  await loginPage.login(user.email, user.password);

  // Додано: Очікуємо, що після логіну DOM оновиться
  await page.waitForLoadState('networkidle');

  const userIsLoggedIn = await homepage.userIsLoggedIn();
  expect(userIsLoggedIn).toBeTruthy();

  await homepage.goToSettings();
  await new SettingsPage(page).logout();

  const userIsLoggedOut = await new LogoutPage(page).userIsLoggedOut();
  expect(userIsLoggedOut).toBeTruthy();
});
