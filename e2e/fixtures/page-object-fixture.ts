import { CartPage } from "../pages/cart.page";
import { CheckOutCompletionPage } from "../pages/checkout-completion.page";
import { CheckoutOverviewPage } from "../pages/checkout-overview.page";
import { CheckoutPage } from "../pages/checkout.page";
import { HomePage } from "../pages/home.page";
import { LoginPage } from "../pages/login.page";
import { test as baseTest } from '@playwright/test';

export type PageObjects = {
    loginPage: LoginPage;
    homePage: HomePage;
    checkoutPage: CheckoutPage;
    cartPage: CartPage;
    checkoutOverviewPage: CheckoutOverviewPage;
    checkoutCompletionPage: CheckOutCompletionPage;
}

export const test = baseTest.extend<PageObjects>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    checkoutOverviewPage: async ({ page }, use) => {
        await use(new CheckoutOverviewPage(page));
    },
    checkoutCompletionPage: async ({ page }, use) => {
        await use(new CheckOutCompletionPage(page));
    }
})