import { test } from '../../../ui/fixtures/page-object-fixture';
import { expect } from '@playwright/test';
import { TestTags } from '../../../ui/tags/test-tags';

test.describe('Choose and add item to cart test', async () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.navigateTo();
    })

    test('should add item to cart successfully', { tag: [TestTags.CART, TestTags.SANITY] }, async ({ homePage }) => {
        await test.step('choose item and add item to cart', async () => {
            await homePage.addItemToCart('Sauce Labs Backpack');
            await expect(homePage.itemCartBadge).toBeVisible();
        })
    })
})

