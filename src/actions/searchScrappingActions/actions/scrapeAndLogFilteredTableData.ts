import { Page } from "puppeteer";
import fs from "fs";

//TODO: Handle errors here 

interface Product {
  code: string;
  Description: string;
  Unit: string;
  Units_Per_Case: string;
  Major_Supplier: string;
  Status: string;
  Available_Stock: string;
  On_Order: string;
}

// Array to hold all products across multiple pages
let allProducts: Product[] = [];

export default async function scrapeAndLogFilteredTableData(page: Page) {
  const trList = await page.$$("tr");
  if(!trList) throw new Error("Table rows not found");
  const products = []; // Array to hold product objects for the current page

  // Skip the first 5 tr elements and the sixth one (column specifier)
  const trListToIterate = trList.slice(6);

  for (const tr of trListToIterate) {
    const tds = await tr.$$("td");
    const tdContents = await Promise.all(
      tds.map((td) => page.evaluate((el) => el.textContent?.trim() || "", td))
    );

    // Create a product object based on the td contents
    const product = {
      code: tdContents[1],
      Description: tdContents[2],
      Unit: tdContents[3],
      Units_Per_Case: tdContents[4],
      Major_Supplier: tdContents[5],
      Status: tdContents[6],
      Available_Stock: tdContents[7],
      On_Order: tdContents[8],
    };
    // Add the product object to the array for the current page
    products.push(product);
  }

  // Filter out unwanted objects
  const filteredProducts = products.filter((product) => {
    return product.code && product.Description && product.Unit;
  });

  // Add the filtered products from the current page to allProducts
  allProducts = [...allProducts, ...filteredProducts];

  // Convert the allProducts array to a JSON string
  const allProductsJSON = JSON.stringify(allProducts, null, 2); // The '2' adds indentation for readability

  // Log JSON 
  console.log(allProductsJSON);

  // Write this JSON to a file
  try {
    fs.writeFileSync("allProducts.json", allProductsJSON);    
  } catch (e) {
    throw new Error("Failed to write to file", { cause: e });
  }
}

