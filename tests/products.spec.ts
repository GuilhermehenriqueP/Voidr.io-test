import { test as base, expect } from '@playwright/test';
import ProductPage from './Pages/ProductPage';


const test = base.extend<{ productPage: ProductPage }>({
    productPage: async ({ page }, use) => {
        const productPage = new ProductPage(page);
        await productPage.navigate(page); 
        await use(productPage);
    },
});

test('Verificar o nome dos produtos na lista ', async ({ productPage }) => {

    const productsTitleList = await productPage.getProductsName();

    for (const item of productsTitleList) {
        await expect(item.slice(0, 10)).toBe("Sauce Labs");
    }
});

test(' Testar o filtro de preço ', async ({ productPage }) => {
    
    await productPage.selectSortOption('lohi');

    await expect(productPage.verifyOrdenationPrice()).resolves.toBe(true);

});

test('Testar o filtro de nome', async ({ productPage }) => {
    

    await productPage.selectSortOption('az');

    await expect(productPage.verifyOrdenationName()).resolves.toBe(true);
    
});
