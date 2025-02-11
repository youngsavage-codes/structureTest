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
exports.fetchTransactionByIdLogic = exports.fetchUserTransactionLogic = exports.fetchAllTransactionLogic = exports.createTransactionLogic = void 0;
const transaction_service_1 = __importDefault(require("../service/transaction_service"));
const error_handler_1 = __importDefault(require("../utils/error_handler"));
const order_service_1 = __importDefault(require("../service/order_service"));
const ordrService = new order_service_1.default;
const transactionService = new transaction_service_1.default;
const createTransactionLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, order_id, amount, status, payment_method, payment_reference } = request.body;
        if (!userId || !order_id || !amount) {
            return error_handler_1.default.sendError(response, 400, "Miss Credential");
        }
        const payLoad = {
            userId,
            order_id,
            amount,
            status,
            payment_method,
            payment_reference
        };
        const orderExist = yield ordrService.fetchOrderById(order_id);
        if (!orderExist) {
            return error_handler_1.default.sendError(response, 404, "Order Not Found");
        }
        const transaction = yield transactionService.createTransaction(payLoad);
        if (!transaction) {
            return error_handler_1.default.sendError(response, 400, "Error Creating Transaction");
        }
        return response.status(200).json({
            success: true,
            message: "Transaction Created",
            transaction
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "Internal Server Error");
    }
});
exports.createTransactionLogic = createTransactionLogic;
const fetchAllTransactionLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transaction = yield transactionService.fetchAllTransaction();
        if (!transaction || transaction.length === 0) {
            return error_handler_1.default.sendError(response, 404, "");
        }
        return response.status(200).json({
            success: true,
            message: "Transactions Fetched",
            transaction
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "");
    }
});
exports.fetchAllTransactionLogic = fetchAllTransactionLogic;
const fetchUserTransactionLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = request.body;
        if (!userId) {
            return error_handler_1.default.sendError(response, 404, "");
        }
        const transaction = yield transactionService.fetchUserTransaction(userId);
        if (!transaction || transaction.length === 0) {
            return error_handler_1.default.sendError(response, 404, "");
        }
        return response.status(200).json({
            success: true,
            message: "Transactions Fetched",
            transaction
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "");
    }
});
exports.fetchUserTransactionLogic = fetchUserTransactionLogic;
const fetchTransactionByIdLogic = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { transactionId } = request.params;
        if (!transactionId) {
            return error_handler_1.default.sendError(response, 404, "");
        }
        const transaction = yield transactionService.fetchTransactionById(transactionId);
        if (!transaction) {
            return error_handler_1.default.sendError(response, 404, "");
        }
        return response.status(200).json({
            success: true,
            message: "Transactions Fetched",
            transaction
        });
    }
    catch (error) {
        return error_handler_1.default.sendError(response, 500, "");
    }
});
exports.fetchTransactionByIdLogic = fetchTransactionByIdLogic;
