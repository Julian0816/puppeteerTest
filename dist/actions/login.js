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
const env_js_1 = require("../env.js");
// Initialize and type the credentials object
const credentials = {
    username: env_js_1.USERNAME,
    password: env_js_1.PASSWORD,
};
const USERNAME_INPUT_SELECTOR = "#ctl00_ContentPlaceHolder1_txtUsername";
const PASSWORD_INPUT_SELECTOR = "#ctl00_ContentPlaceHolder1_txtPassword";
const LOGIN_BUTTON_SELECTOR = "#ctl00_ContentPlaceHolder1_btnOK";
const NEXT_BUTTON_SELECTOR = "#ctl00_ContentPlaceHolder1_btnNext";
function login(page) {
    return __awaiter(this, void 0, void 0, function* () {
        if (credentials.username && credentials.password) {
            yield page.type(USERNAME_INPUT_SELECTOR, credentials.username);
            yield page.type(PASSWORD_INPUT_SELECTOR, credentials.password);
            yield Promise.all([
                page.click(LOGIN_BUTTON_SELECTOR),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
            yield Promise.all([
                page.click(NEXT_BUTTON_SELECTOR),
                page.waitForNavigation({ waitUntil: "networkidle0" }),
            ]);
        }
        else {
            console.error("Username or password is undefined.");
        }
    });
}
exports.default = login;
