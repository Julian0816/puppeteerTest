import puppeteer from "puppeteer";
import setupBrowser from "./actions/setupPage";
import login from "./actions/login";
import search from "./actions/search";
import logout from "./actions/logout";



//TODO: Handle errors properly the way Joe showed me
async function bestFoodScraper() {
    try {
        const browser = await puppeteer.launch({ headless: false });
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