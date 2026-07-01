import { expect } from '@playwright/test';
import { test } from '../../../ui/fixtures/page-object-fixture';
import { TestTags } from '../../../ui/tags/test-tags';

test.describe('Login Page Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        loginPage.navigateTo('/');
    });

    test('should login with valid credentials successfully', { tag: [TestTags.LOGIN, TestTags.SANITY] }, async ({ loginPage }) => {
        await test.step('login with valid username and password', async () => {
            await loginPage.loginToSauceDemo();
        });

        await test.step('verify user is redirected to home page', async () => {
            const currentPage = await loginPage.getCurrentPage();
            await expect(currentPage).toHaveURL(/inventory.html/);
        });
    });

    test('should fail when logging in with wrong credentials', async () => {

    })
});