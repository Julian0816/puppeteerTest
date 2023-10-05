import { USERNAME, PASSWORD } from "../env.js";

const USERNAME_INPUT_SELECTOR = "#ctl00_ContentPlaceHolder1_txtUsername";
const PASSWORD_INPUT_SELECTOR = "#ctl00_ContentPlaceHolder1_txtPassword";
const LOGIN_BUTTON_SELECTOR = "#ctl00_ContentPlaceHolder1_btnOK";
const NEXT_BUTTON_SELECTOR = "#ctl00_ContentPlaceHolder1_btnNext";

export default async function login(page) {
  await page.type(USERNAME_INPUT_SELECTOR, USERNAME);
  await page.type(PASSWORD_INPUT_SELECTOR, PASSWORD);
  await Promise.all([
    page.click(LOGIN_BUTTON_SELECTOR),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);
  await Promise.all([
    page.click(NEXT_BUTTON_SELECTOR),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);
}
