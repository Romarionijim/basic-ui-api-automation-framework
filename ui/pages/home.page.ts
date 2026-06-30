import { Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    get homePageItem(): Locator {
        return this.page.getByTestId('inventory-item-description')
    }

    get addToCartButton(): Locator {
        return this.page.getByRole('button', { name: 'Add to cart' })
    }

    get itemCartBadge(): Locator {
        return this.page.getByTestId('shopping-cart-badge');
    }

    async addItemToCart(itemText: string) {
        const item = this.homePageItem.filter({ hasText: itemText });
        await item.locator(this.addToCartButton).click();
    }
}