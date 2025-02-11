"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = __importDefault(require("../controller/order_controller"));
const auth_middleware_1 = require("../middlewares/auth_middleware");
const orderController = new order_controller_1.default();
const orderRoute = (0, express_1.Router)();
orderRoute.post('/create', auth_middleware_1.authMiddleware, orderController.createOrderController);
orderRoute.get('/', orderController.fetchAllOrderController);
orderRoute.get('/user_order', auth_middleware_1.authMiddleware, orderController.fetchUserOrderController);
orderRoute.get('/:orderId', orderController.fetchOrderByIdController);
exports.default = orderRoute;
