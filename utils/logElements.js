
export default async function logTableDataCellContentByProduct(page) {
    const tdList = await page.$$("tr");
    for (const handle of tdList) {
        const content = await page.evaluate((el) => el.textContent, handle);
        console.log(content.trim());
    }
}