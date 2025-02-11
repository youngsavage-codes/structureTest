"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.createHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createHash = (password) => {
    return bcryptjs_1.default.hash(password, 10);
};
exports.createHash = createHash;
const compareHash = (password, newPassword) => {
    return bcryptjs_1.default.compare(password, newPassword);
};
exports.compareHash = compareHash;
