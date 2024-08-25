import { Page, Locator } from "@playwright/test"
import LoginPage from "./LoginPage"

export default class CheckoutPage{

    readonly page: Page;

    constructor(page: Page) {
        this.page = page
    }

    async navigate(page: Page){
        const loginPage = new LoginPage(page);
        await loginPage.makeLogin('standard_user', 'secret_sauce');
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
        return new CheckoutPage(page);
    }

    async getErrorMessageCheckoutStepOne(): Promise<Locator>{
        return await this.page.getByText('Error: First Name is required');
    }
    async clickOnContinueBtn(){
        await this.page.locator('[data-test="continue"]').click();
    }
    async fillFirstName(name: string){
        await this.page.locator('[data-test="firstName"]').fill(name);
    }

    async fillLasttName(name: string){
        await this.page.locator('[data-test="lastName"]').fill(name);
    }
    async fillZipCode(zipCode: string){
        await this.page.locator('[data-test="postalCode"]').fill(zipCode);
    }

}