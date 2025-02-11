"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controller/cart_controller"));
const auth_middleware_1 = require("../middlewares/auth_middleware");
const cartController = new cart_controller_1.default();
const cartRoute = (0, express_1.Router)();
cartRoute.post('/create', auth_middleware_1.authMiddleware, cartController.createCartController);
cartRoute.get('/', auth_middleware_1.authMiddleware, cartController.fetchCartByIdController);
cartRoute.post('/add_item/', auth_middleware_1.authMiddleware, cartController.addItemToCartController);
cartRoute.post('/remove_item/', auth_middleware_1.authMiddleware, cartController.removeItemToCartController);
cartRoute.post('/clear_item/', auth_middleware_1.authMiddleware, cartController.clearItemFromCartController);
cartRoute.delete('/', auth_middleware_1.authMiddleware, cartController.removeCartController);
exports.default = cartRoute;
