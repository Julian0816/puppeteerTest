import { Page } from "puppeteer";
import keywords from "../keywords";
import scrappingActions from "./searchScrappingActions/scrappingActions";

const PRODUCT_KEY_SEARCH_INPUT = "#ctl00_ContentPlaceHolder1_txtProductKey";
const SEARCH_BUTTON = "#ctl00_ContentPlaceHolder1_btnSearch";

export default async function search(page: Page) {
  for (const item of keywords) {
    // Clear previous input
    try {
      await page.evaluate(
        (selector: any) => (document.querySelector(selector).value = ""),
        PRODUCT_KEY_SEARCH_INPUT
      );
    } catch (e) {
      throw new Error(`Failed to clear input: ${e}`);
    }

    // Type the keyword
    const keyword = typeof item === "object" ? item.keyword : item;
    try {
      await page.type(PRODUCT_KEY_SEARCH_INPUT, keyword);
    } catch (e) {
      throw new Error(`Failed to type keyword: ${e}`);
    }

    // Click the search button
    try {
      await Promise.all([
        page.click(SEARCH_BUTTON),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
    } catch (e) {
      throw new Error(`Failed to perform search: ${e}`);
    }

    // Perform scrapping actions
    try {
      await scrappingActions(page);
    } catch (e) {
      throw new Error(`Failed to execute scrapping actions: ${e}`);
    }
  }
}
