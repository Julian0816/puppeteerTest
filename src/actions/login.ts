import { Page, Browser } from "puppeteer";
import { USERNAME, PASSWORD } from "../env";
import logout from "./logout";

interface Credentials {
  username: string | undefined;
  password: string | undefined;
}

const credentials: Credentials = {
  username: USERNAME,
  password: PASSWORD,
};

const USERNAME_INPUT_SELECTOR = "#ctl00_ContentPlaceHolder1_txtUsername";
const PASSWORD_INPUT_SELECTOR = "#ctl00_ContentPlaceHolder1_txtPassword";
const LOGIN_BUTTON_SELECTOR = "#ctl00_ContentPlaceHolder1_btnOK";
const NEXT_BUTTON_SELECTOR = "#ctl00_ContentPlaceHolder1_btnNext";

export default async function login(page: Page, browser: Browser) {
  if (!credentials.username || !credentials.password) {
    const errorMsg = "Username or password is undefined.";
    await logout(browser);
    throw new Error(errorMsg);
  }

  try {
    await page.type(USERNAME_INPUT_SELECTOR, credentials.username);
    await page.type(PASSWORD_INPUT_SELECTOR, credentials.password);
  } catch (e) {
    const errorMsg = `Failed to type username or password: ${e}`;
    await logout(browser);
    throw new Error(errorMsg);
  }

  try {
    await Promise.all([
      page.click(LOGIN_BUTTON_SELECTOR),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  } catch (e) {
    const errorMsg = `Failed to login: ${e}`;
    await logout(browser);
    throw new Error(errorMsg);
  }

  try {
    await Promise.all([
      page.click(NEXT_BUTTON_SELECTOR),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  } catch (e) {
    const errorMsg = `Failed to click next button: ${e}`;
    await logout(browser);
    throw new Error(errorMsg);
  }
}
