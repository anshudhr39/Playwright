import { test, expect } from "@playwright/test";
const PageLocators = require('../Pages/Pages');
const testData = require('../InputData/inputData.json');
const fs = require('fs');
const path = require('path');

test.only("Place order and Validate", async ({ page }) => {
    const locators = new PageLocators();
    await page.goto(locators.url);
    await page.locator(locators.usernameInput).fill(testData.username);
    await page.locator(locators.passwordInput).fill(testData.password);
    await page.locator(locators.loginButton).click();
    await expect(page.locator(locators.LoginSuccesssLogo)).toHaveText(testData.expectedLoginText);
    console.log("Login Success");

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];
    // Create the folder path
    const folderPath = path.join('screenshots', today);
    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }

    // Generate a timestamp for the screenshot filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

    // Save the screenshot
    await page.screenshot({ path: `${folderPath}/Home-${timestamp}.png` });

    await expect(page.locator(locators.productLocater)).toHaveText(testData.expectedProductText);
    await page.locator(locators.productAddToCartButton).click();
    await page.waitForLoadState('networkidle');
    await page.locator(locators.myCartButton).nth(2).click();
    await expect(page.locator(locators.myCartLogo)).toHaveText(testData.expectedCartText);
    console.log("In My Cart Page");
    await page.screenshot({ path: `${folderPath}/MyCart-${timestamp}.png` });

    await page.locator(locators.checkOutButton).click();
    console.log("In Payment Page");
    await page.screenshot({ path: `${folderPath}/Payment-${timestamp}.png` });

    await page.locator(locators.cardNumberInput).fill(testData.cardNumber);
    await page.locator(locators.cardCvvNumber).fill(testData.cvv);
    await page.locator(locators.cardHolderName).fill(testData.nameOnCard);
    await page.locator(locators.deliveryLocation).pressSequentially("I", { delay: 100 });
    await page.waitForSelector(locators.delievryIndiaLocation);
    await page.locator(locators.delievryIndiaLocation).nth(1).click();
    await page.screenshot({ path: `${folderPath}/CardInfo-${timestamp}.png` });
    await page.locator(locators.placeOrderButton).click();

    await expect(page.locator(locators.postOrderValidation)).toBeVisible();
    console.log("Order placed successfully");
    await page.screenshot({ path: `${folderPath}/OrderPlaced-${timestamp}.png` });

    const orderId = await page.locator(locators.orderIdLocater).nth(2).textContent();
    console.log(`Order id is - ${orderId}`);
    await page.locator(locators.orderHistoryPage).nth(1).click();
    await page.waitForLoadState("networkidle");
    await page.waitForSelector(locators.orderHistoryTable);
    console.log("In Order History Page");
    await page.screenshot({ path: `${folderPath}/HistoryPage-${timestamp}.png` });

    const allOrderId = await page.locator(locators.orderHistoryTable).allTextContents();
    // console.log(allOrderId);

    if (allOrderId.length > 0) {
        allOrderId.forEach((order, index) => {
            const targetOrderId = orderId.replace(/\|/g, "").trim();
            if (order.trim() === targetOrderId) {
                console.log(`Order is present in row no - ${index + 1} of history table`);
            }
        });
    } else {
        console.log("History table is blank");
    }
})