import { Page, Locator } from "@playwright/test"


export default class LoginPage {
    readonly page: Page
    

    constructor(page: Page);


    constructor(page: Page, username?: string, password?: string) {
        this.page = page;
    
        if (username && password) {
            this.navigate();
            this.makeLogin(username, password);
        }
    }


    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async enterUsername(strUser: string) {
        await this.page.locator('[data-test="username"]').fill(strUser);
    }
    async enterPassword(strPwd: string) {
        await this.page.locator('[data-test="password"]').fill(strPwd);
    }
    async clickLoginBtn() {
        await this.page.locator('[data-test="login-button"]').click();
    }

    async getErrorMessageLoginFail(): Promise<Locator>{
        return await this.page.getByText('Epic sadface: Username and password do not match any user in this service');
    }
    async makeLogin(strUser: string, strPwd: string) {
        await this.navigate();
        await this.page.locator('[data-test="username"]').fill(strUser);
        await this.page.locator('[data-test="password"]').fill(strPwd);
        await this.page.locator('[data-test="login-button"]').click();
    }
}