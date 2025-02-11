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
exports.verifyPaymentLogic = exports.acceptPaymentLogic = void 0;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const error_handler_1 = __importDefault(require("../utils/error_handler"));
const transaction_model_1 = __importDefault(require("../models/transaction_model"));
require("dotenv/config");
const order_service_1 = __importDefault(require("../service/order_service"));
const orderService = new order_service_1.default;
const PAYSTACK_BASE_URL = process.env.PAYSTACK_BASE_URL || "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
const acceptPaymentLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const { userId, email, amount, orderId } = request.body;
        if (!email || !amount || !userId || !orderId) {
            return error_handler_1.default.sendError(response, 400, "Email, amount, userId, and orderId are required.");
        }
        const reference = crypto_1.default.randomBytes(12).toString("hex");
        if (!PAYSTACK_SECRET_KEY) {
            throw new Error("Paystack secret key is missing in environment variables.");
        }
        const order = yield orderService.fetchOrderById(orderId);
        if (!order) {
            return error_handler_1.default.sendError(response, 400, "Order not found.");
        }
        if (order.payment_status === 'paid') {
            return error_handler_1.default.sendError(response, 400, "Order Already Paid for");
        }
        const payload = {
            email,
            amount: amount * 100, // Convert NGN to Kobo
            reference,
            currency: "NGN",
            callback_url: "https://yourwebsite.com/payment-success",
            metadata: { userId, orderId }, // Include userId and orderId in metadata
        };
        const result = yield axios_1.default.post(`${PAYSTACK_BASE_URL}/transaction/initialize`, payload, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                "Content-Type": "application/json",
            },
        });
        return response.status(200).json({
            success: true,
            message: "Payment initialized successfully",
            data: result.data,
        });
    }
    catch (error) {
        console.error("Paystack Payment Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        return error_handler_1.default.sendError(response, ((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) || 500, ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || "Failed to initiate payment");
    }
});
exports.acceptPaymentLogic = acceptPaymentLogic;
const verifyPaymentLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    try {
        const { reference } = request.params;
        const result = yield axios_1.default.get(`${PAYSTACK_BASE_URL}/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
            },
        });
        const paymentData = (_a = result.data) === null || _a === void 0 ? void 0 : _a.data;
        if (!paymentData) {
            return error_handler_1.default.sendError(response, 400, "Payment verification failed.");
        }
        const { userId, orderId } = paymentData.metadata; // Extract userId and orderId from metadata
        if (!userId || !orderId) {
            return error_handler_1.default.sendError(response, 400, "Missing userId or orderId in payment metadata.");
        }
        // Set transaction status based on payment status
        const transactionStatus = paymentData.status === "success" ? "completed" : "failed";
        // Create a new transaction record in the database
        const transaction = new transaction_model_1.default({
            user_id: userId,
            order_id: orderId,
            amount: paymentData.amount / 100, // Convert back from kobo to NGN
            status: transactionStatus,
            payment_method: paymentData.channel,
            payment_reference: reference,
        });
        yield transaction.save();
        // Fetch the order and update payment status only if payment is successful
        if (transactionStatus === "completed") {
            const order = yield orderService.fetchOrderById(orderId);
            if (!order) {
                return error_handler_1.default.sendError(response, 400, "Order not found.");
            }
            order.payment_status = "paid";
            yield order.save();
        }
        return response.status(200).json({
            success: true,
            message: `Payment ${transactionStatus} and transaction recorded successfully`,
            data: transaction,
        });
    }
    catch (error) {
        console.error("Payment Verification Error:", ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message);
        return error_handler_1.default.sendError(response, ((_c = error.response) === null || _c === void 0 ? void 0 : _c.status) || 500, ((_e = (_d = error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message) || "Failed to verify payment");
    }
});
exports.verifyPaymentLogic = verifyPaymentLogic;
