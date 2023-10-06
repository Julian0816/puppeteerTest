import { Page } from "puppeteer";
import { USERNAME, PASSWORD } from "../env";

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

export default async function login(page: Page) {
  if (!credentials.username || !credentials.password) {
    throw new Error("Username or password is undefined.");
  }

  try {
    await page.type(USERNAME_INPUT_SELECTOR, credentials.username);
    await page.type(PASSWORD_INPUT_SELECTOR, credentials.password);
  } catch (e) {
    throw new Error(`Failed to type username or password: ${e}`);
  }

  try {
    await Promise.all([
      page.click(LOGIN_BUTTON_SELECTOR),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  } catch (e) {
    throw new Error(`Failed to login: ${e}`);
  }

  try {
    await Promise.all([
      page.click(NEXT_BUTTON_SELECTOR),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  } catch (e) {
    throw new Error(`Failed to click next button: ${e}`);
  }
}

