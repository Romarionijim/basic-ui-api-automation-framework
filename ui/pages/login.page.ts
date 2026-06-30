import { SauceDemoCredentials } from "../consts/sauce-credentials.consts";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    userNameField = this.page.getByTestId('username');
    passwordField = this.page.getByTestId('password');
    loginButton = this.page.getByTestId('login-button');

    async loginToSauceDemo(
        userName: string = SauceDemoCredentials.STANDARD_USERNAME,
        password: string = SauceDemoCredentials.STANDARD_PASSWORD,
    ) {
        await this.navigateTo();
        await this.userNameField.fill(userName);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}