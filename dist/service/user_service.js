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
const mongoose_1 = require("mongoose");
const user_model_1 = __importDefault(require("../models/user_model"));
class UserService {
    createUser(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('loaded Service');
            try {
                const newUser = new user_model_1.default(credentials);
                yield newUser.save();
                return newUser;
            }
            catch (error) {
                return null;
            }
        });
    }
    findEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.findOne({ email });
                return user;
            }
            catch (error) {
                return null;
            }
        });
    }
    findAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_model_1.default.find().select("-password");
                return users;
            }
            catch (error) {
                return null;
            }
        });
    }
    findUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.Types.ObjectId.isValid(userId)) {
                    return null;
                }
                const users = yield user_model_1.default.findById(userId).select("-password");
                return users;
            }
            catch (error) {
                return null;
            }
        });
    }
    updateUser(userId, credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!mongoose_1.Types.ObjectId.isValid(userId)) {
                    return null;
                }
                const users = yield user_model_1.default.findByIdAndUpdate(userId, { $set: credentials }, { new: true });
                return users;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.default = UserService;
