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
const user_logic_1 = require("../logics/user_logic");
const error_handler_1 = __importDefault(require("../utils/error_handler"));
class UserController {
    constructor() {
        this.getAllUsersController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, user_logic_1.getAllUserLogic)(request, response);
            }
            catch (error) {
                return error_handler_1.default.sendError(response, 500, "Failed to fetch users");
            }
        });
    }
    getUserByIdController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, user_logic_1.getUserByIdLogic)(request, response);
            }
            catch (error) {
                return error_handler_1.default.sendError(response, 500, "Failed fetch user");
            }
        });
    }
    updateUserDataController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, user_logic_1.updateUserDataLogic)(request, response);
            }
            catch (error) {
                return error_handler_1.default.sendError(response, 500, "Failed to update user");
            }
        });
    }
}
exports.default = UserController;
