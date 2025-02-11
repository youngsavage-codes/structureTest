import { 
    getAllUserLogic, 
    getUserByIdLogic, 
    updateUserDataLogic 
} from "../logics/user_logic";
import ErrorHandler from "../utils/error_handler";
import { Request, Response } from "express";

class UserController {
    getAllUsersController = async (request: Request, response: Response) => {
        try {
            return await getAllUserLogic(request, response);
        } catch(error) {
            return ErrorHandler.sendError(response, 500, "Failed to fetch users");
        }
    }

    async getUserByIdController(request: Request, response: Response) {
        try {
            return await getUserByIdLogic(request, response);
        } catch(error) {
            return ErrorHandler.sendError(response, 500, "Failed fetch user");
        }
    }

    async updateUserDataController(request: Request, response: Response) {
        try {
            return await updateUserDataLogic(request, response);
        } catch(error) {
            return ErrorHandler.sendError(response, 500, "Failed to update user");
        }
    }
}

export default UserController