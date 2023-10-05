"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = exports.PASSWORD = exports.USERNAME = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.USERNAME = process.env.USERNAME;
exports.PASSWORD = process.env.PASSWORD;
exports.URL = process.env.URL;
