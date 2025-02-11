"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDigits = void 0;
const generateDigits = () => {
    return String(Math.floor(100000 + Math.random() * 900000)); // Ensures a 6-digit OTP (100000 - 999999)
};
exports.generateDigits = generateDigits;
