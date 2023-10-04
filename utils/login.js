import dotenv from "dotenv";
dotenv.config();

const CREDS = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};

export default async function login(page) {
  await page.type("#ctl00_ContentPlaceHolder1_txtUsername", CREDS.username);
  await page.type("#ctl00_ContentPlaceHolder1_txtPassword", CREDS.password);
  await Promise.all([
    page.click("#ctl00_ContentPlaceHolder1_btnOK"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);
  await Promise.all([
    page.click("#ctl00_ContentPlaceHolder1_btnNext"),
    page.waitForNavigation({ waitUntil: "networkidle0" }),
  ]);
}
