import { Browser } from "puppeteer";

export default async function logout(browser: Browser) {
  await browser.close();
}