import { expect } from '@playwright/test';
import { test } from '../../../e2e/fixtures/page-object-fixture';
import { mockGenerator } from '../../../e2e/mocks/mock-generator';
import { TestTags } from '../../../e2e/tags/test-tags';

test.describe('Purchase Order from start to finish end to end', async () => {
    const checkoutDetails = mockGenerator.generateCheckoutDetails();
    const sauceLabBackpack = 'Sauce Labs Backpack';
    const thankYouForYourOrderText = 'Thank you for your order!';

    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateTo('/inventory.html');
    })

    test('Should purchase and ship items to address', { tag: [TestTags.PURCHASE, TestTags.SANITY] },
        async ({ homePage, cartPage, checkoutPage, checkoutOverviewPage, checkoutCompletionPage }) => {
            await test.step('add item to cart', async () => {
                await homePage.addItemToCart(sauceLabBackpack);
            });

            await test.step('go to cart - assert details and continue to checkout', async () => {
                await homePage.goToCart();
                const cartCurrentPage = cartPage.getCurrentPage();
                await expect(cartCurrentPage).toHaveURL(/cart.html/);
                await expect(cartPage.itemCartName).toHaveText(sauceLabBackpack);
                await expect(cartPage.itemCartDetails).toHaveCount(1);
                await cartPage.clickCheckout();
            })

            await test.step('fill checkout details and continue', async () => {
                await checkoutPage.fillCheckoutDetails(checkoutDetails);
                await checkoutPage.clickContinue();
            })

            await test.step('assert checkout overview details and continue', async () => {
                await expect(checkoutOverviewPage.inventoryItem).toContainText(sauceLabBackpack);
                await expect(checkoutOverviewPage.inventoryItem).toHaveCount(1);
                await checkoutOverviewPage.clickFinishButton();
            });

            await test.step('validate order was comopleted successfully', async () => {
                const checkoutCompletion = checkoutCompletionPage.getCurrentPage();
                await expect(checkoutCompletion).toHaveURL(/checkout-complete.html/);
                await expect(checkoutCompletionPage.orderCompletionText).toHaveText(thankYouForYourOrderText);
            });
        })
})