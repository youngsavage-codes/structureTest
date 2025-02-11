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
exports.authMiddleware = void 0;
const error_handler_1 = __importDefault(require("../utils/error_handler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = request.cookies.token;
        if (!token) {
            return error_handler_1.default.sendError(response, 400, "Authentication Required");
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error("JWT_SECRET is not defined in the environment variables.");
        }
        // Decode token using the JWT secret
        const decodeToken = jsonwebtoken_1.default.verify(token, jwtSecret);
        // Check if the token contains the 'id' field
        if (decodeToken.id) {
            request.body.userId = decodeToken.id;
            return next(); // Proceed to the next middleware or route handler
        }
        else {
            return error_handler_1.default.sendError(response, 400, "Invalid token. Please log in again.");
        }
    }
    catch (error) {
        console.error("Error in authMiddleware:", error);
        return error_handler_1.default.sendError(response, 500, "Server Error");
    }
});
exports.authMiddleware = authMiddleware;
