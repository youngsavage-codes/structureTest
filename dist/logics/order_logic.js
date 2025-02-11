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
exports.createOrderLogic = exports.fetchOrderByIdLogic = exports.fetchUserOrderLogic = exports.fetchAllOrderLogic = void 0;
const order_service_1 = __importDefault(require("../service/order_service"));
const user_service_1 = __importDefault(require("../service/user_service"));
const error_handler_1 = __importDefault(require("../utils/error_handler"));
const orderService = new order_service_1.default();
const userService = new user_service_1.default();
const fetchAllOrderLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = yield orderService.fetchAllOrder();
        if (!order || order.length === 0) {
            return error_handler_1.default.sendError(response, 404, "No Order Found");
        }
        return response.status(200).json({
            success: true,
            message: "Orders Fetched",
            order
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.fetchAllOrderLogic = fetchAllOrderLogic;
const fetchUserOrderLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.body;
        if (!userId) {
            return error_handler_1.default.sendError(response, 404, "No Order Found");
        }
        const userExist = yield userService.findUserById(userId);
        if (!userExist || !userExist._id) {
            return error_handler_1.default.sendError(response, 404, "User Dosent Exist");
        }
        const order = yield orderService.fetchUserOrder(userExist._id);
        if (!order || order.length === 0) {
            return error_handler_1.default.sendError(response, 404, "No Order Found");
        }
        return response.status(200).json({
            success: true,
            message: "Orders Fetched",
            order
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.fetchUserOrderLogic = fetchUserOrderLogic;
const fetchOrderByIdLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = request.params;
        if (!orderId) {
            return error_handler_1.default.sendError(response, 404, "No Order Found");
        }
        const order = yield orderService.fetchOrderById(orderId);
        if (!order) {
            return error_handler_1.default.sendError(response, 404, "No Order Found");
        }
        return response.status(200).json({
            success: true,
            message: "Order Fetched",
            order
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.fetchOrderByIdLogic = fetchOrderByIdLogic;
const createOrderLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, products, total } = request.body;
        // Validation check
        if (!userId || !Array.isArray(products) || products.length === 0 || !total) {
            return error_handler_1.default.sendError(response, 400, "Required Credential");
        }
        // Construct the order payload
        const orderPayload = {
            user_id: userId,
            products: products.map((item) => ({
                product_id: item.product_id, // Assuming the product contains `productId`
                quantity: item.quantity,
                amount: item.amount
            })),
            total: total
        };
        // Create the order
        const createdOrder = yield orderService.createOrder(orderPayload);
        if (!createdOrder) {
            return error_handler_1.default.sendError(response, 500, "Failed to create order");
        }
        // Return success response
        return response.status(201).json({
            success: true,
            message: "Order created successfully",
            order: createdOrder
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.createOrderLogic = createOrderLogic;
