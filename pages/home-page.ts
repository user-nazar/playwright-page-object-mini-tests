import type { Page } from "playwright";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open() {
    await this.page.goto("http://angular.realworld.io/");
  }

  async goToLoginPage() {
    await this.page.click('a[routerlink="/login"]');
  }

  async userIsLoggedIn(): Promise<boolean> {
    try {
      await this.page.waitForSelector("a.nav-link >> text=Settings", {
        timeout: 10000,
      });
      return true;
    } catch {
      return false;
    }
  }
}
