import puppeteer, { Browser } from "puppeteer";
import setupBrowser from "./actions/setupPage";
import login from "./actions/login";
import searchAndScrap from "./actions/searchAndScrap";
import logout from "./actions/logout";

async function bestFoodScraper() {
  let browser: Browser | null = null;

  try {
    // Launch the browser
    browser = await puppeteer.launch({ headless: false });

    // Open a new page
    const page = await browser.newPage();

    // Setup the browser with predefined settings
    await setupBrowser(page, browser);

    // Perform login
    await login(page, browser);

    // Perform search and scrap
    await searchAndScrap(page, browser);

  } catch (error) {
    // Catch any errors thrown by the individual functions
    console.error("An error occurred:", error);

  } finally {
    // Perform logout after any error in the code is thrown
    if (browser) {
      await logout(browser);
    }
  }
}

bestFoodScraper();
