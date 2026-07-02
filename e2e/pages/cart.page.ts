import { BasePage } from "./base.page";

export class CartPage extends BasePage {
    itemCartDetails = this.page.getByTestId('inventory-item');
    itemCartName = this.page.getByTestId('inventory-item-name');
    itemCartPrice = this.page.getByTestId('inventory-item-price');
    checkoutButton = this.page.getByTestId('checkout');

    async clickCheckout() {
        await this.checkoutButton.click();
    }
}