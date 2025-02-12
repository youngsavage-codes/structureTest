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
const orders_model_1 = __importDefault(require("../models/orders_model"));
class OrderService {
    createOrder(credential) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = new orders_model_1.default(credential);
                order.save();
                return order;
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchAllOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orders_model_1.default.find();
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchUserOrder(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orders_model_1.default.find({ user_id: userId }).populate("user_id").populate("products.product_id");
            }
            catch (error) {
                return null;
            }
        });
    }
    fetchOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield orders_model_1.default.findOne({ _id: orderId });
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.default = OrderService;
