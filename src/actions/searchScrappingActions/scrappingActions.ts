import { Page } from "puppeteer";
import logTableDataCellContentByProduct from "./actions/logElements";

export default async function scrappingActions(page: Page) {
  // Log Elements to the console
  try {
    await logTableDataCellContentByProduct(page);
  } catch (e) {
    throw new Error(`Failed to log elements: ${e}`);
  }
}