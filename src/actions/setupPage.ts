import { Page } from "puppeteer";
import { URL } from "../env";

export default async function setupBrowser(page: Page) {
  try {
    await page.setViewport({ width: 1200, height: 720 });
  } catch (e) {
    throw new Error(`Failed to set viewport: ${e}`);
  }

  if (!URL) {
    throw new Error("URL is undefined.");
  }

  try {
    await page.goto(URL, { waitUntil: "networkidle0" });
  } catch (e) {
    throw new Error(`Failed to navigate to URL: ${e}`);
  }
}

