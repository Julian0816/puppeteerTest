import puppeteer from "puppeteer";
import setupBrowser from "./actions/setupBrowser.js";
import login from "./actions/login.js";
import search from "./actions/search.js";
import logout from "./actions/logout.js";



async function bestFoodScraper() {
    //   await Login();
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
