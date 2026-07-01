import { test } from '../../../ui/fixtures/page-object-fixture';
import { expect } from '@playwright/test';
import { HomePage } from '../../../ui/pages/home.page';


test.describe('', async () => {
    let homePage: HomePage;


    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateTo();
    })

    test('should add item to cart successfully', async ({ homePage }) => {
        await test.step('choose item and add item to cart', async () => {
            await homePage.addItemToCart('Sauce Labs Backpack');
            await expect(homePage.itemCartBadge).toBeVisible();
        })
    })
})

