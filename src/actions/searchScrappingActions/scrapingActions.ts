import { Page, Browser } from "puppeteer";
import scrapeAndLogFilteredTableData from "./actions/scrapeAndLogFilteredTableData";
import navigateToNextPage from "./actions/navigateToNextPage";

export default async function scrapingActions(page: Page, browser: Browser) {
  try {
    while (true) {
      // Keep running until the break statement is reached
      await scrapeAndLogFilteredTableData(page);

      const hasNextPage = await navigateToNextPage(page, browser);
      if (!hasNextPage) {
        break;
      }
    }
  } catch (e) {
    throw new Error(`Failed to log elements: ${e}`);
  }
}
