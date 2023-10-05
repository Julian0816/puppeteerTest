import { Page } from "puppeteer";
import keywords from "../keywords.js";
import logTableDataCellContentByProduct from "../utils/logElements.js";

const PRODUCT_KEY_SEARCH_INPUT = "#ctl00_ContentPlaceHolder1_txtProductKey";
const SEARCH_BUTTON = "#ctl00_ContentPlaceHolder1_btnSearch";

export default async function search(page: Page) {
  try {
    for (const item of keywords) {
      // Clear previous input
      await page.evaluate(
        (selector: any) => (document.querySelector(selector).value = ""),
        PRODUCT_KEY_SEARCH_INPUT
      );

      // Type the keyword
      const keyword = typeof item === "object" ? item.keyword : item; // Check if item is an object or string
      await page.type(PRODUCT_KEY_SEARCH_INPUT, keyword);

      // Click the search button
      await Promise.all([
        page.click(SEARCH_BUTTON),
        page.waitForNavigation({ waitUntil: "networkidle0" }), // Wait for navigation to complete
      ]);

      //Log Elements to the console
      await logTableDataCellContentByProduct(page)


    }

  } catch (error) {
    console.error("An error occurred in the search function:", error);
  }
}
