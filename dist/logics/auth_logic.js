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
exports.resetPasswordLogic = exports.sendResetOtpLogic = exports.verifyAccountLogic = exports.sendVerifyOtpLogic = exports.isAuthenticatedLogic = exports.logoutLogic = exports.loginLogic = exports.registerLogic = void 0;
const user_service_1 = __importDefault(require("../service/user_service"));
const hashes_1 = require("../utils/hashes");
const token_1 = require("../utils/token");
const error_handler_1 = __importDefault(require("../utils/error_handler"));
const generate_digits_1 = require("../utils/generate_digits");
const userService = new user_service_1.default();
// Register Logic
const registerLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = request.body;
        if (!name || !email || !password) {
            return error_handler_1.default.sendError(response, 400, "All fields are required");
        }
        const emailUsed = yield userService.findEmail(email);
        if (emailUsed) {
            return error_handler_1.default.sendError(response, 400, "Email Already In Use");
        }
        const hashedPassword = yield (0, hashes_1.createHash)(password);
        const newUser = { name, email, password: hashedPassword };
        const createdUser = yield userService.createUser(newUser);
        if (!createdUser || !createdUser._id) {
            return error_handler_1.default.sendError(response, 500, "User creation failed");
        }
        const token = yield (0, token_1.generateToken)(createdUser._id);
        response.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return response.status(200).json({ success: true, message: "Account Created Successfully" });
    }
    catch (err) {
        console.error("Error in registerLogic:", err);
        return error_handler_1.default.sendError(response, 500, "Internal server error");
    }
});
exports.registerLogic = registerLogic;
// Login Logic
const loginLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = request.body;
        if (!email || !password) {
            return error_handler_1.default.sendError(response, 400, "Required Credentials");
        }
        const emailExist = yield userService.findEmail(email);
        if (!emailExist) {
            return error_handler_1.default.sendError(response, 404, "Email Not Found");
        }
        if (!emailExist.password) {
            return error_handler_1.default.sendError(response, 500, "User password is missing");
        }
        const matchedPass = yield (0, hashes_1.compareHash)(password, emailExist.password);
        if (!matchedPass) {
            return error_handler_1.default.sendError(response, 400, "Password Incorrect");
        }
        if (!emailExist._id) {
            return error_handler_1.default.sendError(response, 400, "id not found");
        }
        const token = yield (0, token_1.generateToken)(emailExist._id);
        response.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return response.status(200).json({ success: true, message: "Login Successful" });
    }
    catch (error) {
        console.error("Error in loginLogic:", error);
        return error_handler_1.default.sendError(response, 500, "Internal server error");
    }
});
exports.loginLogic = loginLogic;
// Logout Logic
const logoutLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        response.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return response.status(200).json({ success: true, message: "Logout successful" });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal server error");
    }
});
exports.logoutLogic = logoutLogic;
// Authentication Check Logic
const isAuthenticatedLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return response.status(200).json({ success: true });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal server error");
    }
});
exports.isAuthenticatedLogic = isAuthenticatedLogic;
// Send Verification OTP Logic
const sendVerifyOtpLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.body;
        if (!userId) {
            return error_handler_1.default.sendError(response, 400, "User ID is required");
        }
        const user = yield userService.findUserById(userId);
        if (!user) {
            return error_handler_1.default.sendError(response, 404, "User not found");
        }
        if (user.isAccountVerified) {
            return error_handler_1.default.sendError(response, 400, "User is already verified");
        }
        const otp = (0, generate_digits_1.generateDigits)();
        if (!otp) {
            return error_handler_1.default.sendError(response, 500, "Failed to generate OTP");
        }
        user.verifyOtp = otp;
        user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24-hour expiry
        yield user.save();
        console.log(`OTP sent to ${user.email}: ${otp}`);
        return response.status(200).json({ success: true, message: "Verification OTP sent to email" });
    }
    catch (error) {
        console.error("Error in sendVerifyOtpLogic:", error);
        return error_handler_1.default.sendError(response, 500, "Internal server error");
    }
});
exports.sendVerifyOtpLogic = sendVerifyOtpLogic;
// Verify Account Logic
const verifyAccountLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, otp } = request.body;
        if (!otp) {
            return error_handler_1.default.sendError(response, 400, "Required Credentials");
        }
        const user = yield userService.findUserById(userId);
        if (!user) {
            return error_handler_1.default.sendError(response, 404, "User Not Found");
        }
        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return error_handler_1.default.sendError(response, 400, "Incorrect OTP");
        }
        user.verifyOtp = '';
        user.isAccountVerified = true;
        yield user.save();
        return response.status(200).json({ success: true, message: "Account Verified Successfully" });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal server error");
    }
});
exports.verifyAccountLogic = verifyAccountLogic;
// Send Password Reset OTP Logic
const sendResetOtpLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.body;
        if (!email) {
            return error_handler_1.default.sendError(response, 400, "Required Credentials");
        }
        const user = yield userService.findEmail(email);
        if (!user) {
            return error_handler_1.default.sendError(response, 404, "User Not Found");
        }
        const otp = (0, generate_digits_1.generateDigits)();
        user.resetOtp = otp;
        user.resetOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24-hour expiry
        yield user.save();
        return response.status(200).json({ success: true, message: "Reset OTP Sent to Email" });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal server error");
    }
});
exports.sendResetOtpLogic = sendResetOtpLogic;
// Reset Password Logic
const resetPasswordLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, newPassword } = request.body;
        if (!email || !otp || !newPassword) {
            return error_handler_1.default.sendError(response, 400, "Required Credentials");
        }
        const user = yield userService.findEmail(email);
        if (!user) {
            return error_handler_1.default.sendError(response, 404, "User Not Found");
        }
        const hashedPassword = yield (0, hashes_1.createHash)(newPassword);
        user.resetOtp = '';
        user.resetOtpExpiresAt = 0;
        user.password = hashedPassword;
        yield user.save();
        return response.status(200).json({ success: true, message: "Password Reset Successfully" });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal server error");
    }
});
exports.resetPasswordLogic = resetPasswordLogic;
