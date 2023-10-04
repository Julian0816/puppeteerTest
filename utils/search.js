// import keywords from "../keywords.js";

// export default async function search(page){
//     for (const item of keywords) {
//         await page.type("#ctl00_ContentPlaceHolder1_txtProductKey", item.keyword);
//         await page.click("#ctl00_ContentPlaceHolder1_btnSearch");
//     }
// }

import keywords from "../keywords.js";

export default async function search(page) {
  try {
    for (const item of keywords) {
      // Clear previous input
      await page.evaluate(
        (selector) => (document.querySelector(selector).value = ""),
        "#ctl00_ContentPlaceHolder1_txtProductKey"
      );

      // Type the keyword
      const keyword = typeof item === "object" ? item.keyword : item; // Check if item is an object or string
      await page.type("#ctl00_ContentPlaceHolder1_txtProductKey", keyword);

      // Click the search button
      await Promise.all([
        page.click("#ctl00_ContentPlaceHolder1_btnSearch"),
        page.waitForNavigation({ waitUntil: "networkidle0" }), // Wait for navigation to complete
        console.log(keyword, " :", item.Description)
      ]);
    }
  } catch (error) {
    console.error("An error occurred in the search function:", error);
  }
}
