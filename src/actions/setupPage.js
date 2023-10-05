import { URL } from "../env.js";

export default async function setupBrowser(page) {
  await page.setViewport({ width: 1200, height: 720 });
  await page.goto(URL, { waitUntil: "networkidle0" });
}
