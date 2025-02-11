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
Object.defineProperty(exports, "__esModule", { value: true });
const auth_logic_1 = require("../logics/auth_logic");
class AuthController {
    constructor() {
        this.registerController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, auth_logic_1.registerLogic)(request, response);
            }
            catch (error) {
            }
        });
        this.loginController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, auth_logic_1.loginLogic)(request, response);
            }
            catch (error) {
            }
        });
        this.logoutController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, auth_logic_1.logoutLogic)(request, response);
            }
            catch (error) {
            }
        });
        this.isAuthenticatedController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, auth_logic_1.isAuthenticatedLogic)(request, response);
            }
            catch (error) {
            }
        });
        this.verifyAccountController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, auth_logic_1.verifyAccountLogic)(request, response);
            }
            catch (error) {
            }
        });
        this.sendAccountVerifyOtpController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, auth_logic_1.sendVerifyOtpLogic)(request, response);
            }
            catch (error) {
            }
        });
        this.sendResetOtpController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, auth_logic_1.sendResetOtpLogic)(request, response);
            }
            catch (error) {
            }
        });
        this.resetPasswordController = (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, auth_logic_1.resetPasswordLogic)(request, response);
            }
            catch (error) {
            }
        });
    }
}
exports.default = AuthController;
