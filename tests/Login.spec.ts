import { test as base, expect } from "@playwright/test";
import LoginPage from "./Pages/LoginPage";

// Define a fixture para a LoginPage
const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate(); // Substitua pela URL real, se necessário
        await use(loginPage);
    },
});

test('Verificar login bem-sucedido', async ({ loginPage, page }) => {
    await loginPage.enterUsername('standard_user');
    await loginPage.enterPassword('secret_sauce');
  
    await loginPage.clickLoginBtn();
  
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('erificar erro no login com credenciais inválidas', async ({ loginPage, page }) => {
    await loginPage.enterUsername('test_login');
    await loginPage.enterPassword('testPassword');
  
    await loginPage.clickLoginBtn();
  
    const errorText = await loginPage.getErrorMessageLoginFail();
    
    await expect(errorText).toBeVisible();


});
