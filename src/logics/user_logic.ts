import { Request, Response } from "express";
import UserService from "../service/user_service"
import ErrorHandler from "../utils/error_handler";
import { IUser } from "../types/interface";

const userService = new UserService();

export const getAllUserLogic = async (request: Request, response: Response) => {
    try {
        const users = await userService.findAllUsers();

        if(!users || users.length === 0) {
            return ErrorHandler.sendError(response, 404, "No User Found");
        }

        return response.status(200).json({success: true, users});
    } catch(eror) {
        return ErrorHandler.sendError(response, 500, "Server Error");
    }
}

export const getUserByIdLogic = async (request: Request, response: Response) => {
    try {
        const { userId } = request.body

        if(!userId) {
            return ErrorHandler.sendError(response, 400, "Required Credential");
        }

        const user = await userService.findUserById(userId);

        if(!user) {
            return ErrorHandler.sendError(response, 404, "No User Found");
        }

        return response.status(200).json({success: true, user});
    } catch(error) {
        return ErrorHandler.sendError(response, 500, "Server Error");
    }
}

export const updateUserDataLogic = async (request: Request, response: Response) => {
    try {
        const { userId, name, email } = request.body;
    
        if (!userId) {
            return ErrorHandler.sendError(response, 400, "Required Credential");
        }

        const user = await userService.findUserById(userId);
        if (!user) {
            return ErrorHandler.sendError(response, 404, "No User Found");
        }

        const updatedUser = await userService.updateUser(userId, { name, email });

        return response.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
        
    } catch (error) {
        return ErrorHandler.sendError(response, 500, "Server Error");
    }
};
