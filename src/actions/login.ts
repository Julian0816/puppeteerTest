import { Page, Browser } from "puppeteer";
import { USERNAME, PASSWORD } from "../env";



export interface Credentials {
  username?: string
  password?: string
}
const credentials: Credentials = {
  username: USERNAME,
  password: PASSWORD,
};

export interface LoginSelectors {
  usernameInput: string;
  passwordInput: string;
  loginButton: string;
  nextButton: string;
}
const loginSelectors: LoginSelectors = {
  usernameInput: "#ctl00_ContentPlaceHolder1_txtUsername",
  passwordInput: "#ctl00_ContentPlaceHolder1_txtPassword",
  loginButton: "#ctl00_ContentPlaceHolder1_btnOK",
  nextButton: "#ctl00_ContentPlaceHolder1_btnNext",
};

export default async function login(page: Page, browser: Browser) {
  if (!credentials.username || !credentials.password) {
    const errorMsg = "Username or password is undefined.";
    throw new Error(errorMsg);
  }

  try {
    await page.type(loginSelectors.usernameInput, credentials.username);
    await page.type(loginSelectors.passwordInput, credentials.password);
  } catch (e) {
    throw new Error("Failed to type username or password", { cause: e });
  }

  try {
    await Promise.all([
      page.click(loginSelectors.loginButton),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  } catch (e) {
    throw new Error("Failed to login", { cause: e });
  }

  try {
    await Promise.all([
      page.click(loginSelectors.nextButton),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
  } catch (e) {
    throw new Error("Failed to click next button", { cause: e });
  }
}
