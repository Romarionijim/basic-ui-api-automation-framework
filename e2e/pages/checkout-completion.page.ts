import { BasePage } from "./base.page";

export class CheckOutCompletionPage extends BasePage {
    orderCompletionText = this.page.getByTestId('complete-header');
    backHomeButton = this.page.getByTestId('back-to-products');

    async clickBackHomeButton() {
        await this.backHomeButton.click();
    }
}