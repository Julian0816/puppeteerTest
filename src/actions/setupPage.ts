import { Page } from "puppeteer";
import { URL } from "../env.js";

export default async function setupBrowser(page: Page) {
  await page.setViewport({ width: 1200, height: 720 });
  // await page.goto(URL, { waitUntil: "networkidle0" });
  if (URL) {
    await page.goto(URL, { waitUntil: "networkidle0" });
  } else {
    console.error("URL is undefined.");
  }
}
