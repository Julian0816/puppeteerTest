import { Page, Browser } from "puppeteer";
import { URL } from "../env";

interface ViewportConfig {
  width: number;
  height: number;
}
const viewportConfig: ViewportConfig = {
  width: 1200,
  height: 720
};

export default async function setupBrowser(page: Page, browser: Browser): Promise<void> {
  // Set view port 
  try {
    await page.setViewport( viewportConfig ); // Mental note, the vewport takes an object
  } catch (e) {
    throw new Error("Failed to set viewport", { cause: e });
  }

  // Validate URL 
  if (!URL) {
    throw new Error("URL is undefined.");
  }

  // Navigate to URL
  try {
    await page.goto(URL, { waitUntil: "networkidle0" });
  } catch (e) {
    throw new Error("Failed to navigate to URL", { cause: e });
  }
}

