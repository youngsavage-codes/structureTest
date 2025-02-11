"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controller/user_controller"));
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth_middleware");
const userRoute = (0, express_1.Router)();
const userController = new user_controller_1.default();
userRoute.get('/', userController.getAllUsersController);
userRoute.get('/single', auth_middleware_1.authMiddleware, userController.getUserByIdController);
userRoute.put('/', auth_middleware_1.authMiddleware, userController.updateUserDataController);
exports.default = userRoute;
