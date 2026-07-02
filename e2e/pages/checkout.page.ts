import { CheckoutDetails } from "../types/checkout-details.type";
import { BasePage } from "./base.page";

export class CheckoutPage extends BasePage {
    continueButton = this.page.getByTestId('continue');

    async fillCheckoutDetails(checkoutDetails: CheckoutDetails) {
        const fieldNameLocators: (keyof CheckoutDetails)[] = ['firstName', 'lastName', 'postalCode'];
        for (let i = 0; i < fieldNameLocators.length; i++) {
            await this.page.getByTestId(fieldNameLocators[i]).fill(checkoutDetails[fieldNameLocators[i]]);
        }
    }

    async clickContinue() {
        await this.continueButton.click();
    }

}