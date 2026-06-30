import { expect, test } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home.page';


test.describe('', async () => {
    let homePage: HomePage;


    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        await homePage.navigateTo();
    })

    test('should add item to cart successfully', async () => {
        await test.step('choose item and add item to cart', async () => {
            await homePage.addItemToCart('Sauce Labs Backpack');
            await expect(homePage.itemCartBadge).toBeVisible();
        })
    })
})

