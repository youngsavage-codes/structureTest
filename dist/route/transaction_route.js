"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = __importDefault(require("../controller/transaction_controller"));
const auth_middleware_1 = require("../middlewares/auth_middleware");
const transactionController = new transaction_controller_1.default;
const transactionRoute = (0, express_1.Router)();
transactionRoute.get('/', transactionController.fetchAllTransactionController);
transactionRoute.get('/user', auth_middleware_1.authMiddleware, transactionController.fetchUserTransactionController);
transactionRoute.get('/:transactionId', transactionController.fetchTransactionByIdController);
transactionRoute.post('/create', auth_middleware_1.authMiddleware, transactionController.creatTransactionController);
exports.default = transactionRoute;
