import { Page, Browser } from "puppeteer";
import logout from "../../logout"; // Import your existing logout function


interface NavigateSelectors {
  nextButton: string;
}
const navigateSelector: NavigateSelectors = {
  nextButton: "#ctl00_ContentPlaceHolder1_btnNext",
};

export default async function navigateToNextPage(page: Page, browser: Browser) {
  try {
    const nextButton = await page.$(navigateSelector.nextButton);

    if (nextButton) {
      const isDisabled = await page.$eval(navigateSelector.nextButton, (element) => {
        const button = element as HTMLButtonElement;
        return button.disabled;
      });

      if (isDisabled) {
        // Perform logout if the next button is disabled
        await logout(browser);
        return false; // No more next pages
      } else {
        await Promise.all([
          page.click(navigateSelector.nextButton),
          page.waitForNavigation({ waitUntil: "networkidle0" }),
        ]);
        return true; // There is a next page
      }
    } else {
      // Perform logout if the next button is not found
      await logout(browser);
      return false; // No more next pages
    }
  } catch (e) {
    throw new Error("Failed to click next button", { cause: e });
  }
}

