import { Page, Locator } from "@playwright/test"
import LoginPage from "./LoginPage"


export default class CartPage{


    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async navigate(page: Page){
        const loginPage = new LoginPage(page);
        await loginPage.makeLogin('standard_user', 'secret_sauce');
        await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
    }
    async removeCartItem(){
        await this.page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    }

    async CartIsEmpty(): Promise<boolean>{
        const CartItens = await this.page.locator('[data-test="inventory-item"]').allTextContents();
        if(CartItens.length === 0){
            return true;
        }
        return false;
    }

    async clickCheckouBtn(){
        await this.page.locator('[data-test="checkout"]').click();
    }





}