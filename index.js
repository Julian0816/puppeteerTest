import puppeteer from "puppeteer";
import setupBrowser from "./actions/setupPage.js";
import login from "./actions/login.js";
import search from "./actions/search.js";
import logout from "./actions/logout.js";



//TODO: Handle errors properly the way Joe showed me
async function bestFoodScraper() {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await setupBrowser(page);
        await login(page);
        await search(page);
        await logout(browser);
    } catch (error) {
        console.error("An error occurred:", error);
    }

}

bestFoodScraper();