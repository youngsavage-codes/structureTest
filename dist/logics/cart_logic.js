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
exports.removeCartLogic = exports.clearItemsFromCartLogic = exports.removeItemFromCartLogic = exports.addItemToCartLogic = exports.createCartLogic = exports.fetchCartByIdLogic = void 0;
const cart_service_1 = require("../service/cart_service");
const error_handler_1 = __importDefault(require("../utils/error_handler"));
const mongoose_1 = require("mongoose"); // Import ObjectId
const cartService = new cart_service_1.CartService();
const fetchCartByIdLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.body;
        if (!userId) {
            return error_handler_1.default.sendError(response, 400, "Credential Required");
        }
        const cart = yield cartService.findCartById(userId);
        if (!cart) {
            const createCart = yield cartService.createCart({ user_id: userId });
            if (!createCart) {
                return error_handler_1.default.sendError(response, 400, "Cart Not Created");
            }
            return createCart;
        }
        return response.status(200).json({
            success: true,
            message: "Cart Fetched",
            cart,
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.fetchCartByIdLogic = fetchCartByIdLogic;
const createCartLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.body;
        if (!userId) {
            return error_handler_1.default.sendError(response, 400, "Credential Required");
        }
        const cartExist = yield cartService.findCartById(userId);
        if (cartExist) {
            return error_handler_1.default.sendError(response, 400, "Cart Already Exists");
        }
        const cart = yield cartService.createCart({ user_id: userId });
        if (!cart) {
            return error_handler_1.default.sendError(response, 400, "Cart Not Created");
        }
        return response.status(200).json({
            success: true,
            message: "Cart Created",
            cart,
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.createCartLogic = createCartLogic;
const addItemToCartLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = request.body;
        if (!userId || !productId) {
            return error_handler_1.default.sendError(response, 400, "User ID and Product ID are required");
        }
        // Convert productId to ObjectId for accurate comparison
        const productObjectId = new mongoose_1.Types.ObjectId(productId);
        // Find the user's cart
        let cart = yield cartService.findCartById(userId);
        if (!cart) {
            // If cart doesn't exist, create a new one
            cart = yield cartService.createCart({ user_id: userId, products: [] });
            if (!cart) {
                return error_handler_1.default.sendError(response, 400, "Failed to create cart");
            }
        }
        // Ensure cart.products is initialized
        if (!cart.products) {
            cart.products = [];
        }
        // Check if the product already exists in the cart
        const productInCart = cart.products.find(item => item.product_id.equals(productObjectId));
        if (productInCart) {
            // If the product exists, update the quantity
            productInCart.quantity += 1;
        }
        else {
            // Otherwise, add a new product entry
            cart.products.push({
                product_id: productObjectId, // Ensure correct type
                quantity: 1,
            });
        }
        // Save the updated cart
        yield cart.save();
        return response.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            cart,
        });
    }
    catch (error) {
        console.error("Error adding item to cart:", error);
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.addItemToCartLogic = addItemToCartLogic;
const removeItemFromCartLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, productId } = request.body;
        if (!userId || !productId) {
            return error_handler_1.default.sendError(response, 400, "User ID and Product ID are required");
        }
        const cart = yield cartService.findCartById(userId);
        if (!cart) {
            return error_handler_1.default.sendError(response, 400, "Cart Does Not Exist");
        }
        // Convert productId to ObjectId for accurate comparison
        const productObjectId = new mongoose_1.Types.ObjectId(productId);
        // Find the product in the cart
        const productInCart = cart.products.find(item => item.product_id.equals(productObjectId));
        if (!productInCart) {
            return error_handler_1.default.sendError(response, 400, "Product not found in cart");
        }
        // If quantity is greater than 1, reduce it by 1
        if (productInCart.quantity > 1) {
            productInCart.quantity -= 1;
        }
        else {
            // If quantity is 1, remove the product from the cart
            const productIndex = cart.products.findIndex(item => item.product_id.equals(productObjectId));
            if (productIndex !== -1) {
                cart.products.splice(productIndex, 1);
            }
        }
        yield cart.save();
        return response.status(200).json({
            success: true,
            message: productInCart.quantity > 0
                ? "Product quantity reduced successfully"
                : "Product removed from cart successfully",
            cart,
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.removeItemFromCartLogic = removeItemFromCartLogic;
const clearItemsFromCartLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.body;
        if (!userId) {
            return error_handler_1.default.sendError(response, 400, "User ID is required");
        }
        const cart = yield cartService.findCartById(userId);
        if (!cart) {
            return error_handler_1.default.sendError(response, 400, "Cart Does Not Exist");
        }
        // Remove all products from the cart
        cart.products.splice(0);
        // Save the updated cart
        yield cart.save();
        return response.status(200).json({
            success: true,
            message: "All items removed from cart successfully",
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.clearItemsFromCartLogic = clearItemsFromCartLogic;
const removeCartLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.body;
        if (!userId) {
            return error_handler_1.default.sendError(response, 400, "User ID is required");
        }
        const cart = yield cartService.findCartById(userId);
        if (!cart) {
            return error_handler_1.default.sendError(response, 400, "Cart Does Not Exist");
        }
        yield cartService.removeCart(userId);
        return response.status(200).json({
            success: true,
            message: "Cart removed successfully",
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.removeCartLogic = removeCartLogic;
