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
exports.updateUserDataLogic = exports.getUserByIdLogic = exports.getAllUserLogic = void 0;
const user_service_1 = __importDefault(require("../service/user_service"));
const error_handler_1 = __importDefault(require("../utils/error_handler"));
const userService = new user_service_1.default();
const getAllUserLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.findAllUsers();
        if (!users || users.length === 0) {
            return error_handler_1.default.sendError(response, 404, "No User Found");
        }
        return response.status(200).json({ success: true, users });
    }
    catch (eror) {
        return error_handler_1.default.sendError(response, 500, "Server Error");
    }
});
exports.getAllUserLogic = getAllUserLogic;
const getUserByIdLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.body;
        if (!userId) {
            return error_handler_1.default.sendError(response, 400, "Required Credential");
        }
        const user = yield userService.findUserById(userId);
        if (!user) {
            return error_handler_1.default.sendError(response, 404, "No User Found");
        }
        return response.status(200).json({ success: true, user });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Server Error");
    }
});
exports.getUserByIdLogic = getUserByIdLogic;
const updateUserDataLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, name, email } = request.body;
        if (!userId) {
            return error_handler_1.default.sendError(response, 400, "Required Credential");
        }
        const user = yield userService.findUserById(userId);
        if (!user) {
            return error_handler_1.default.sendError(response, 404, "No User Found");
        }
        const updatedUser = yield userService.updateUser(userId, { name, email });
        return response.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Server Error");
    }
});
exports.updateUserDataLogic = updateUserDataLogic;
