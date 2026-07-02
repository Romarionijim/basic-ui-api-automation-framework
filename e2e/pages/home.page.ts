import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    homePageItem = this.page.getByTestId('inventory-item-description');
    addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
    itemCartBadge = this.page.getByTestId('shopping-cart-badge');
    shoppingCart = this.page.getByTestId('shopping-cart-link');

    async addItemToCart(itemText: string) {
        const item = this.homePageItem.filter({ hasText: itemText });
        await item.locator(this.addToCartButton).click();
    }

    async goToCart() {
        await this.shoppingCart.click();
    }
}
