import { BasePage } from "./base.page";

export class CheckoutOverviewPage extends BasePage {
    inventoryItem = this.page.getByTestId('inventory-item');
    finishButton = this.page.getByTestId('finish');

    async clickFinishButton() {
        await this.finishButton.click();
    }

}