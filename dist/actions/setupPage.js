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
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env");
function setupBrowser(page) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.setViewport({ width: 1200, height: 720 });
        // await page.goto(URL, { waitUntil: "networkidle0" });
        if (env_1.URL) {
            yield page.goto(env_1.URL, { waitUntil: "networkidle0" });
        }
        else {
            console.error("URL is undefined.");
        }
    });
}
exports.default = setupBrowser;
