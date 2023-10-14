import { Page, Browser } from "puppeteer";
import keywords from "../keywords";
import scrapingActions from "./searchScrappingActions/scrapingActions";


export interface SearchSelectors {
  searchInput: string;
  nextButton: string;
}
const searchSelectors: SearchSelectors = {
  searchInput: "#ctl00_ContentPlaceHolder1_txtProductKey",
  nextButton: "#ctl00_ContentPlaceHolder1_btnSearch"
};

export default async function search(page: Page, browser: Browser) {
  for (const item of keywords) {
    // Clear previous input
    try {
      await page.evaluate(
        (selector: any) => (document.querySelector(selector).value = ""),
        searchSelectors.searchInput
      );
    } catch (e) {
      throw new Error("Failed to clear input", { cause: e });
    }

    // Type the keyword
    try {
      await page.type(searchSelectors.searchInput, item.keyword);
    } catch (e) {
      throw new Error("Failed to type keyword", { cause: e });
    }

    // Click the search button
    try {
      await Promise.all([
        page.click(searchSelectors.nextButton),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
    } catch (e) {
      throw new Error("Failed to perform search", { cause: e });
    }

    // Perform scrapping actions
    try {
      await scrapingActions(page, browser);
    } catch (e) {
      throw new Error("Failed to execute scrapping actions", { cause: e });
    }
  }
}
