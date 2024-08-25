import { Page, Locator } from "@playwright/test"
import LoginPage from "./LoginPage"

export default class ProductPage {
    
    readonly page: Page


    constructor(page: Page) {
        this.page = page
    }

    async navigate(page: Page) {
        const loginPage = new LoginPage(page);
        await loginPage.makeLogin('standard_user', 'secret_sauce');
        return new ProductPage(page);
    }

    async clickAddProduct() {
        await this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    }
    async getProductsName(): Promise<string[]> {
        const productNames = await this.page.locator('.inventory_item_name').allTextContents(); 
        return productNames;
    }

    async getProductsPrice(): Promise<number[]> {
        const productsPrice = await this.page.locator('[data-test="inventory-item-price"]').allTextContents();
        const pricesAsNumbers = productsPrice.map(price => parseFloat(price.replace(/[^0-9.-]+/g, '')));
        return pricesAsNumbers;
    }

    async verifyOrdenationPrice(): Promise<boolean>{
        return this.estaOrdenadoNumericamente(await this.getProductsPrice());
    }

    async verifyOrdenationName(): Promise<boolean>{
        return this.estaOrdenadoAlfabeticamente(await this.getProductsName());
    }

    async isItemInCart(): Promise<boolean> {
        return await this.page.locator('[data-test="shopping-cart-badge"]').isVisible();
    }

    async getSortButn(): Promise<Locator> {
        return await this.page.locator('.product_sort_container');
    }

    async selectSortOption(value: string): Promise<void> {
        const sortButton = this.page.locator('.product_sort_container');
        await sortButton.click();
        await sortButton.selectOption({ value });
    }
    
    private estaOrdenadoNumericamente(array: number[]): boolean {
        return array.every((num, index) => index === 0 || num >= array[index - 1]);
    }

    private estaOrdenadoAlfabeticamente(array: string[]): boolean {
        return array.every((str, index) => index === 0 || str.localeCompare(array[index - 1]) >= 0);
    }

    
    
}