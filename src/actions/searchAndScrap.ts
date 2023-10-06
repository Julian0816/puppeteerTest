import { Page, Browser } from "puppeteer";
import logout from "./logout";
import keywords from "../keywords";
import scrappingActions from "./searchScrappingActions/scrappingActions";

const PRODUCT_KEY_SEARCH_INPUT = "#ctl00_ContentPlaceHolder1_txtProductKey";
const SEARCH_BUTTON = "#ctl00_ContentPlaceHolder1_btnSearch";

export default async function search(page: Page, browser: Browser) {
  for (const item of keywords) {
    // Clear previous input
    try {
      await page.evaluate(
        (selector: any) => (document.querySelector(selector).value = ""),
        PRODUCT_KEY_SEARCH_INPUT
      );
    } catch (e) {
      const errorMsg = `Failed to clear input: ${e}`;
      await logout(browser);
      throw new Error(errorMsg);
    }

    // Type the keyword
    const keyword = typeof item === "object" ? item.keyword : item;
    try {
      await page.type(PRODUCT_KEY_SEARCH_INPUT, keyword);
    } catch (e) {
      const errorMsg = `Failed to type keyword: ${e}`;
      await logout(browser);
      throw new Error(errorMsg);
    }

    // Click the search button
    try {
      await Promise.all([
        page.click(SEARCH_BUTTON),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
    } catch (e) {
      const errorMsg = `Failed to perform search: ${e}`;
      await logout(browser);
      throw new Error(errorMsg);
    }

    // Perform scrapping actions
    try {
      await scrappingActions(page);
    } catch (e) {
      const errorMsg = `Failed to execute scrapping actions: ${e}`;
      await logout(browser);
      throw new Error(errorMsg);
    }
  }
}
