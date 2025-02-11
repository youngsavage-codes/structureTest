"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler {
    static sendError(res, statusCode, message, details) {
        return res.status(statusCode).json({
            success: false,
            message,
            details: details || null, // Send details if available, otherwise send null
        });
    }
}
exports.default = ErrorHandler;
