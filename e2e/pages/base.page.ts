import { Page, Locator, expect } from "@playwright/test";
import { WaitForVisibilityOptions } from "../consts/visibility-options.consts";

export class BasePage {
    constructor(protected page: Page) {
        this.page = page;
    }

    async navigateTo(url: string = '/inventory.html') {
        await this.page.goto(url);
    }

    async waitFor(locator: Locator, waitOption: WaitForVisibilityOptions) {
        await locator.waitFor({ state: waitOption })
    }

    getCurrentPage() {
        return this.page;
    }

    async getLocatorText(locator: Locator) {
        const tagElement = await locator.evaluate((el) => el.tagName.toLowerCase() === 'input');
        return tagElement ? (await locator.inputValue()).trim() : (await locator.innerText()).trim();
    }
}