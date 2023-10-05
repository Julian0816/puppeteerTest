"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keywords_js_1 = __importDefault(require("../keywords.js"));
const logElements_js_1 = __importDefault(require("../utils/logElements.js"));
const PRODUCT_KEY_SEARCH_INPUT = "#ctl00_ContentPlaceHolder1_txtProductKey";
const SEARCH_BUTTON = "#ctl00_ContentPlaceHolder1_btnSearch";
function search(page) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const item of keywords_js_1.default) {
                // Clear previous input
                yield page.evaluate((selector) => (document.querySelector(selector).value = ""), PRODUCT_KEY_SEARCH_INPUT);
                // Type the keyword
                const keyword = typeof item === "object" ? item.keyword : item; // Check if item is an object or string
                yield page.type(PRODUCT_KEY_SEARCH_INPUT, keyword);
                // Click the search button
                yield Promise.all([
                    page.click(SEARCH_BUTTON),
                    page.waitForNavigation({ waitUntil: "networkidle0" }), // Wait for navigation to complete
                ]);
                //Log Elements to the console
                yield (0, logElements_js_1.default)(page);
            }
        }
        catch (error) {
            console.error("An error occurred in the search function:", error);
        }
    });
}
exports.default = search;
