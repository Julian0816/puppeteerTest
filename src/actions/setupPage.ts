import { Page, Browser } from "puppeteer";
import { URL } from "../env";
import logout from "./logout";

export default async function setupBrowser(page: Page, browser: Browser) {
  try {
    await page.setViewport({ width: 1200, height: 720 });
  } catch (e) {
    const errorMsg = `Failed to set viewport: ${e}`;
    await logout(browser);
    throw new Error(errorMsg);
  }

  if (!URL) {
    throw new Error("URL is undefined.");
  }

  try {
    await page.goto(URL, { waitUntil: "networkidle0" });
  } catch (e) {
    const errorMsg = `Failed to navigate to URL: ${e}`;
    await logout(browser);
    throw new Error(errorMsg);
  }
}

