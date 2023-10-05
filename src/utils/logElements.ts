import { Page } from "puppeteer";

export default async function logTableDataCellContentByProduct(page: Page) {
    const tdList = await page.$$("tr");
    for (const handle of tdList) {
        const content = await page.evaluate((el: { textContent: any; }) => el.textContent, handle);
        console.log(content.trim());
    }
}