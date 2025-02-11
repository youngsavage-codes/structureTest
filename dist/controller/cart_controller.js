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
const cart_logic_1 = require("../logics/cart_logic");
const error_handler_1 = __importDefault(require("../utils/error_handler"));
class CartController {
    createCartController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, cart_logic_1.createCartLogic)(request, response);
            }
            catch (error) {
                return error_handler_1.default.sendError(response, 500, "Failed to Create Cart.");
            }
        });
    }
    fetchCartByIdController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, cart_logic_1.fetchCartByIdLogic)(request, response);
            }
            catch (error) {
                return error_handler_1.default.sendError(response, 500, "Failed to add product.");
            }
        });
    }
    addItemToCartController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, cart_logic_1.addItemToCartLogic)(request, response);
            }
            catch (error) {
                return error_handler_1.default.sendError(response, 500, "Failed to add product.");
            }
        });
    }
    removeItemToCartController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, cart_logic_1.removeItemFromCartLogic)(request, response);
            }
            catch (error) {
                return error_handler_1.default.sendError(response, 500, "Failed to add product.");
            }
        });
    }
    clearItemFromCartController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, cart_logic_1.clearItemsFromCartLogic)(request, response);
            }
            catch (error) {
                return error_handler_1.default.sendError(response, 500, "Failed to add product.");
            }
        });
    }
    removeCartController(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, cart_logic_1.removeCartLogic)(request, response);
            }
            catch (error) {
                return error_handler_1.default.sendError(response, 500, "Failed to add product.");
            }
        });
    }
}
exports.default = CartController;
