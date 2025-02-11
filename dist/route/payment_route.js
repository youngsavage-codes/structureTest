"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = __importDefault(require("../controller/payment_controller"));
const auth_middleware_1 = require("../middlewares/auth_middleware");
const paymentController = new payment_controller_1.default();
const paymentRoute = (0, express_1.Router)();
paymentRoute.post('/initialize', auth_middleware_1.authMiddleware, paymentController.acceptPayment);
paymentRoute.post('/verify/:reference', paymentController.verifyPayment);
exports.default = paymentRoute;
