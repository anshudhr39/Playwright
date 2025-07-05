// @ts-check
import { test, expect, chromium } from '@playwright/test';

test("playwright new test", async ({ page }) => {
  const browser = await chromium.launch({ headless: false });

  // Step 1: Go to Amazon India
  await page.goto('https://www.amazon.in');
  await expect(page).toHaveTitle('Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({ path: `screenshots/homepage-${timestamp}.png` });


  // Step 2: Search for "laptop"
  await page.locator('#twotabsearchtextbox').fill('laptop');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000); // waits for 3 seconds


  // Step 3: Wait for product titles to load
  await page.waitForSelector('.s-main-slot');
  
  await page.screenshot({ path: `screenshots/homepage-${timestamp}.png` });
  await page.waitForSelector('.s-main-slot .a-text-normal');
  // Step 4: Get all product titles using CSS selector
  const productTitles = await page.locator('.s-main-slot .a-text-normal').allTextContents();

  // Step 5: Filter for HP laptops
  const hpLaptops = productTitles.filter(title => title.toLowerCase().includes('hp'));

  if (hpLaptops.length > 0) {
    console.log(`✅ Found ${hpLaptops.length} HP laptops:`);
    hpLaptops.forEach((title, index) => console.log(`${index + 1}. ${title}`));
  } else {
    console.log('❌ No HP laptops found in the search results.');
  }

  await browser.close();

})

test("RahulShetty", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const blinkText = page.locator("[href$='-request']");
  await expect(blinkText).toHaveAttribute("class", "blinkingText");

  // First login attempt with incorrect credentials
  await page.locator(".form-group #username").fill("rahul");
  await page.locator(".form-group #password").fill("learning");
  await page.locator(".form-group select").selectOption("consult");
  // await page.pause();
  await expect(page.locator(".radiotextsty ~input[value='admin']")).toBeChecked();
  const okayBtn = page.locator('#okayBtn');
  okayBtn.click();

  await page.locator(".radiotextsty ~input[value='user']").click();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await page.locator("#signInBtn").click();

  const errorMsg = await page.locator("[style*='block']").textContent();
  console.log("Error message:", errorMsg);
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');

  // Second login attempt with correct credentials
  await page.locator(".form-group #username").fill("");
  await page.locator(".form-group #username").fill("rahulshettyacademy");
  await page.locator("#signInBtn").click();

  // Assertions on specific phones
  const phone1 = page.locator(".card-body a").first();
  const phone2 = page.locator(".card-body a").nth(1);

  await expect(phone1).toContainText("iphone");
  await expect(phone2).toContainText("Samsung");

  // Get all phone names and log them
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body a").first().waitFor();
  const elements = await page.locator(".card-body a").allTextContents();

  if (elements.length > 0) {
    elements.forEach((ele, index) => {
      console.log(`Phone with index ${index} is ${ele}`);
    });
  } else {
    console.log("No text found");
  }
});

test("handle child windows", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const blinkText = page.locator("[href$='-request']");
  await expect(blinkText).toHaveAttribute("class", "blinkingText");
  //WILL FIRE TWO STEPS PARALLELY
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    blinkText.click(),
  ])
  await newPage.waitForLoadState('networkidle');
  const text = await newPage.locator(".red").textContent();
  const textArr = text?.split("@")
  if (textArr) {
    const mail = textArr[1].split(" ")[0]
    console.log(mail);
    await page.locator(".form-group #username").fill(mail);
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    await page.screenshot({ path: `screenshots/homepage-${timestamp}.png` });
  }
})

