import { Page } from "puppeteer";
import { USERNAME, PASSWORD } from "../env.js";

// Define an interface for credentials
interface Credentials {
  username: string | undefined;
  password: string | undefined;
}

// Initialize and type the credentials object
const credentials: Credentials = {
  username: USERNAME,
  password: PASSWORD,
};

const USERNAME_INPUT_SELECTOR = "#ctl00_ContentPlaceHolder1_txtUsername";
const PASSWORD_INPUT_SELECTOR = "#ctl00_ContentPlaceHolder1_txtPassword";
const LOGIN_BUTTON_SELECTOR = "#ctl00_ContentPlaceHolder1_btnOK";
const NEXT_BUTTON_SELECTOR = "#ctl00_ContentPlaceHolder1_btnNext";

export default async function login(page: Page) {
  if (credentials.username && credentials.password) {
    await page.type(USERNAME_INPUT_SELECTOR, credentials.username);
    await page.type(PASSWORD_INPUT_SELECTOR, credentials.password);
    await Promise.all([
      page.click(LOGIN_BUTTON_SELECTOR),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    await Promise.all([
      page.click(NEXT_BUTTON_SELECTOR),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  } else {
    console.error("Username or password is undefined.");
  }
}
