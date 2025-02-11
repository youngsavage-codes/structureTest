import UserController from "../controller/user_controller";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth_middleware";

const userRoute = Router();
const userController = new UserController();

userRoute.get('/', userController.getAllUsersController);
userRoute.get('/single', authMiddleware, userController.getUserByIdController);
userRoute.put('/', authMiddleware, userController.updateUserDataController);

export default userRoute