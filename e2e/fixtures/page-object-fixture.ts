import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { test as baseTest } from '@playwright/test';

export type PageObjects = {
    loginPage: LoginPage;
    homePage: HomePage;
}

export const test = baseTest.extend<PageObjects>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    }
})