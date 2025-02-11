"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controller/auth_controller"));
const auth_middleware_1 = require("../middlewares/auth_middleware");
const authRoute = (0, express_1.Router)();
const authController = new auth_controller_1.default();
authRoute.get('/is_authenticated', auth_middleware_1.authMiddleware, authController.isAuthenticatedController);
authRoute.post('/register', authController.registerController);
authRoute.post('/login', authController.loginController);
authRoute.post('/logout', authController.logoutController);
authRoute.post('/send_verify_otp', auth_middleware_1.authMiddleware, authController.sendAccountVerifyOtpController);
authRoute.post('/verify_account', auth_middleware_1.authMiddleware, authController.verifyAccountController);
authRoute.post('/send_reset_otp', authController.sendResetOtpController);
authRoute.post('/reset_password', authController.resetPasswordController);
exports.default = authRoute;
