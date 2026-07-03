import { expect } from '@playwright/test';
import { test } from '../../../e2e/fixtures/page-object-fixture';
import { TestTags } from '../../../e2e/tags/test-tags';
import { SauceDemoCredentials } from '../../../e2e/consts/sauce-credentials.consts';
import { LoginError } from '../../../e2e/consts/login-error.consts';

test.describe('Login Page Tests', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigateTo('/');
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

    test('should fail when logging in with wrong credentials', { tag: [TestTags.LOGIN, TestTags.SANITY] }, async ({ loginPage }) => {
        await test.step('login with wrong username and password', async () => {
            await loginPage.loginToSauceDemo(SauceDemoCredentials.LOCKED_OUT_USERNAME, SauceDemoCredentials.RANDOM_PASSWORD);
            await expect(loginPage.loginErrorMessages).toHaveText(LoginError.NO_MATCH_CREDENTIALS);
        });

        await test.step('login with locked out user and correct password', async () => {
            await loginPage.loginToSauceDemo(SauceDemoCredentials.LOCKED_OUT_USERNAME, SauceDemoCredentials.STANDARD_PASSWORD);
            await expect(loginPage.loginErrorMessages).toHaveText(LoginError.LOCKED_OUT_USER);
        })

        await test.step('login with correct username and wrong password', async () => {
            await loginPage.loginToSauceDemo(SauceDemoCredentials.STANDARD_USERNAME, SauceDemoCredentials.RANDOM_PASSWORD);
            await expect(loginPage.loginErrorMessages).toHaveText(LoginError.NO_MATCH_CREDENTIALS);
        })

        await test.step('login with empty username and password', async () => {
            await loginPage.loginToSauceDemo('', '');
            await expect(loginPage.loginErrorMessages).toHaveText(LoginError.USERNAME_REQUIRED);
        });

        await test.step('login with empty username', async () => {
            await loginPage.loginToSauceDemo('', SauceDemoCredentials.STANDARD_PASSWORD);
            await expect(loginPage.loginErrorMessages).toHaveText(LoginError.USERNAME_REQUIRED);
        });

        await test.step('login with empty password', async () => {
            await loginPage.loginToSauceDemo(SauceDemoCredentials.STANDARD_USERNAME, '');
            await expect(loginPage.loginErrorMessages).toHaveText(LoginError.PASSWORD_REQUIRED);
        });
    })
});