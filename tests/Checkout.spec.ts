import { test as base, expect } from '@playwright/test';
import CheckoutPage from './Pages/CheckoutPage';


const test = base.extend<{ checkoutPage: CheckoutPage }>({
    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.navigate(page);
        await use(checkoutPage);
    },
});


test('Tentar avançar no checkout sem preencher os campos obrigatórios', async ({ checkoutPage }) => {

    await checkoutPage.clickOnContinueBtn();

    const errorMessageLocator = await checkoutPage.getErrorMessageCheckoutStepOne();

    await expect(errorMessageLocator).toBeVisible();

})

test('Preencher os campos obrigatórios e avançar no checkout', async ({checkoutPage, page}) => {

    await checkoutPage.fillFirstName('Gui');
    await checkoutPage.fillLasttName('Surname');
    await checkoutPage.fillZipCode('06615452');

    await checkoutPage.clickOnContinueBtn();

    await expect(page).toHaveURL(/checkout-step-two/);
})