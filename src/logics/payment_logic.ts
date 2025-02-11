import { Request, Response } from "express";
import axios from "axios";
import crypto from "crypto";
import ErrorHandler from "../utils/error_handler";
import Transaction from "../models/transaction_model";
import "dotenv/config";

import OrderService from "../service/order_service";
const orderService = new OrderService

const PAYSTACK_BASE_URL = process.env.PAYSTACK_BASE_URL || "https://api.paystack.co";
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

export const acceptPaymentLogic = async (request: Request, response: Response) => {
    try {
        const { userId, email, amount, orderId } = request.body;

        if (!email || !amount || !userId || !orderId) {
            return ErrorHandler.sendError(response, 400, "Email, amount, userId, and orderId are required.");
        }

        const reference = crypto.randomBytes(12).toString("hex");

        if (!PAYSTACK_SECRET_KEY) {
            throw new Error("Paystack secret key is missing in environment variables.");
        }

        const order = await orderService.fetchOrderById(orderId);

        if (!order) {
            return ErrorHandler.sendError(response, 400, "Order not found.");
        }

        if(order.payment_status === 'paid') {
            return ErrorHandler.sendError(response, 400, "Order Already Paid for");
        }

        const payload = {
            email,
            amount: amount * 100, // Convert NGN to Kobo
            reference,
            currency: "NGN",
            callback_url: "https://yourwebsite.com/payment-success",
            metadata: { userId, orderId }, // Include userId and orderId in metadata
        };

        const result = await axios.post(
            `${PAYSTACK_BASE_URL}/transaction/initialize`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.status(200).json({
            success: true,
            message: "Payment initialized successfully",
            data: result.data,
        });
    } catch (error: any) {
        console.error("Paystack Payment Error:", error.response?.data || error.message);

        return ErrorHandler.sendError(
            response,
            error.response?.status || 500,
            error.response?.data?.message || "Failed to initiate payment"
        );
    }
};

export const verifyPaymentLogic = async (request: Request, response: Response) => {
    try {
        const { reference } = request.params;

        const result = await axios.get(
            `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
            {
                headers: {
                    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
                },
            }
        );

        const paymentData = result.data?.data;
        if (!paymentData) {
            return ErrorHandler.sendError(response, 400, "Payment verification failed.");
        }

        const { userId, orderId } = paymentData.metadata; // Extract userId and orderId from metadata

        if (!userId || !orderId) {
            return ErrorHandler.sendError(response, 400, "Missing userId or orderId in payment metadata.");
        }

        // Set transaction status based on payment status
        const transactionStatus = paymentData.status === "success" ? "completed" : "failed";

        // Create a new transaction record in the database
        const transaction = new Transaction({
            user_id: userId,
            order_id: orderId,
            amount: paymentData.amount / 100, // Convert back from kobo to NGN
            status: transactionStatus,
            payment_method: paymentData.channel,
            payment_reference: reference,
        });

        await transaction.save();

        // Fetch the order and update payment status only if payment is successful
        if (transactionStatus === "completed") {
            const order = await orderService.fetchOrderById(orderId);

            if (!order) {
                return ErrorHandler.sendError(response, 400, "Order not found.");
            }

            order.payment_status = "paid";
            await order.save();
        }

        return response.status(200).json({
            success: true,
            message: `Payment ${transactionStatus} and transaction recorded successfully`,
            data: transaction,
        });
    } catch (error: any) {
        console.error("Payment Verification Error:", error.response?.data || error.message);

        return ErrorHandler.sendError(
            response,
            error.response?.status || 500,
            error.response?.data?.message || "Failed to verify payment"
        );
    }
};
