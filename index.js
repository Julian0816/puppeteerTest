import puppeteer from "puppeteer";
import { url } from "./env.js";
import login from "./utils/login.js";
import search from "./utils/search.js";
import logout from "./utils/logout.js";



async function bestFoodScraper() {
    //   await Login();
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.setViewport({ width: 1200, height: 720 });
        await page.goto(url, { waitUntil: "networkidle0" });
        await login(page);
        await search(page);
        await logout(browser);
    } catch (error) {
        console.error("An error occurred:", error);
    }

}

bestFoodScraper();
