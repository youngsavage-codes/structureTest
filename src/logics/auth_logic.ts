import { Request, Response } from "express";
import UserService from "../service/user_service";
import { compareHash, createHash } from "../utils/hashes";
import { IUser } from "../types/interface";
import { generateToken } from "../utils/token";
import ErrorHandler from "../utils/error_handler";
import { generateDigits } from "../utils/generate_digits";

const userService = new UserService();

// Register Logic
export const registerLogic = async (request: Request, response: Response) => {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return ErrorHandler.sendError(response, 400, "All fields are required");
        }

        const emailUsed = await userService.findEmail(email);

        if (emailUsed) {
            return ErrorHandler.sendError(response, 400, "Email Already In Use");
        }

        const hashedPassword = await createHash(password);
        const newUser: IUser = { name, email, password: hashedPassword };

        const createdUser = await userService.createUser(newUser);

        if (!createdUser || !createdUser._id) {
            return ErrorHandler.sendError(response, 500, "User creation failed");
        }

        const token = await generateToken(createdUser._id);
        response.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return response.status(200).json({ success: true, message: "Account Created Successfully" });
    } catch (err) {
        console.error("Error in registerLogic:", err);
        return ErrorHandler.sendError(response, 500, "Internal server error");
    }
};

// Login Logic
export const loginLogic = async (request: Request, response: Response) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return ErrorHandler.sendError(response, 400, "Required Credentials");
        }

        const emailExist = await userService.findEmail(email);
        if (!emailExist) {
            return ErrorHandler.sendError(response, 404, "Email Not Found");
        }

        if (!emailExist.password) {
            return ErrorHandler.sendError(response, 500, "User password is missing");
        }

        const matchedPass = await compareHash(password, emailExist.password);
        if (!matchedPass) {
            return ErrorHandler.sendError(response, 400, "Password Incorrect");
        }

        if(!emailExist._id) {
            return ErrorHandler.sendError(response, 400, "id not found");
        }

        const token = await generateToken(emailExist._id);
        response.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return response.status(200).json({ success: true, message: "Login Successful" });
    } catch (error) {
        console.error("Error in loginLogic:", error);
        return ErrorHandler.sendError(response, 500, "Internal server error");
    }
};

// Logout Logic
export const logoutLogic = async (request: Request, response: Response) => {
    try {
        response.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });

        return response.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal server error");
    }
};

// Authentication Check Logic
export const isAuthenticatedLogic = async (request: Request, response: Response) => {
    try {
        return response.status(200).json({ success: true });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal server error");
    }
};

// Send Verification OTP Logic
export const sendVerifyOtpLogic = async (request: Request, response: Response) => {
    try {
        const { userId } = request.body;

        if (!userId) {
            return ErrorHandler.sendError(response, 400, "User ID is required");
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            return ErrorHandler.sendError(response, 404, "User not found");
        }

        if (user.isAccountVerified) {
            return ErrorHandler.sendError(response, 400, "User is already verified");
        }

        const otp = generateDigits();
        if (!otp) {
            return ErrorHandler.sendError(response, 500, "Failed to generate OTP");
        }

        user.verifyOtp = otp;
        user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24-hour expiry
        await user.save();

        console.log(`OTP sent to ${user.email}: ${otp}`);
        return response.status(200).json({ success: true, message: "Verification OTP sent to email" });
    } catch (error) {
        console.error("Error in sendVerifyOtpLogic:", error);
        return ErrorHandler.sendError(response, 500, "Internal server error");
    }
};

// Verify Account Logic
export const verifyAccountLogic = async (request: Request, response: Response) => {
    try {
        const { userId, otp } = request.body;

        if (!otp) {
            return ErrorHandler.sendError(response, 400, "Required Credentials");
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            return ErrorHandler.sendError(response, 404, "User Not Found");
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return ErrorHandler.sendError(response, 400, "Incorrect OTP");
        }

        user.verifyOtp = '';
        user.isAccountVerified = true;
        await user.save();

        return response.status(200).json({ success: true, message: "Account Verified Successfully" });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal server error");
    }
};

// Send Password Reset OTP Logic
export const sendResetOtpLogic = async (request: Request, response: Response) => {
    try {
        const { email } = request.body;

        if (!email) {
            return ErrorHandler.sendError(response, 400, "Required Credentials");
        }

        const user = await userService.findEmail(email);
        if (!user) {
            return ErrorHandler.sendError(response, 404, "User Not Found");
        }

        const otp = generateDigits();
        user.resetOtp = otp;
        user.resetOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24-hour expiry
        await user.save();

        return response.status(200).json({ success: true, message: "Reset OTP Sent to Email" });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal server error");
    }
};

// Reset Password Logic
export const resetPasswordLogic = async (request: Request, response: Response) => {
    try {
        const { email, otp, newPassword } = request.body;

        if (!email || !otp || !newPassword) {
            return ErrorHandler.sendError(response, 400, "Required Credentials");
        }

        const user = await userService.findEmail(email);
        if (!user) {
            return ErrorHandler.sendError(response, 404, "User Not Found");
        }

        const hashedPassword = await createHash(newPassword);

        user.resetOtp = '';
        user.resetOtpExpiresAt = 0;
        user.password = hashedPassword;
        await user.save();

        return response.status(200).json({ success: true, message: "Password Reset Successfully" });
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Internal server error");
    }
};
