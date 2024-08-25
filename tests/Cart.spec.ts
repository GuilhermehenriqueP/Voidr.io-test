import { test as base, expect } from "@playwright/test";
import CartPage from "./Pages/CartPage";

// Define a fixture para a cartPage
const test = base.extend<{ cartPage: CartPage }>({
    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await cartPage.navigate(page); 
        await use(cartPage);
    },
});

test('Verificar itens no carrinho de compras', async ({  cartPage}) => {
    await expect(await cartPage.CartIsEmpty()).toBe(false);

});

test('Verificar o botão de remover itens do carrinho', async ({cartPage})=> {
    await cartPage.removeCartItem();
    await expect(await cartPage.CartIsEmpty()).toBe(true);
})

test(' Tentar avançar no checkout com o carrinho vazio', async ({cartPage, page}) => {
    await cartPage.removeCartItem();
    await cartPage.clickCheckouBtn();
    await expect(page).not.toHaveURL(/checkout-step-one/);
})