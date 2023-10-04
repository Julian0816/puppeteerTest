import { USERNAME, PASSWORD } from "../env.js";

export default async function login(page) {
  await page.type("#ctl00_ContentPlaceHolder1_txtUsername", USERNAME);
  await page.type("#ctl00_ContentPlaceHolder1_txtPassword", PASSWORD);
  await Promise.all([
    page.click("#ctl00_ContentPlaceHolder1_btnOK"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);
  await Promise.all([
    page.click("#ctl00_ContentPlaceHolder1_btnNext"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);
}
