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
exports.CartService = void 0;
const cart_model_1 = __importDefault(require("../models/cart_model"));
class CartService {
    createCart(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newCart = new cart_model_1.default(credential);
                yield newCart.save();
                return newCart;
            }
            catch (error) {
                console.error("Error creating cart:", error);
                return null;
            }
        });
    }
    findCartById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield cart_model_1.default.findOne({ user_id: userId }).populate("user_id").populate('products.product_id');
            }
            catch (error) {
                console.error("Error finding cart:", error);
                return null;
            }
        });
    }
    removeCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield cart_model_1.default.deleteOne({ user_id: userId });
                return result.deletedCount > 0;
            }
            catch (error) {
                console.error("Error removing cart:", error);
                return false;
            }
        });
    }
}
exports.CartService = CartService;
