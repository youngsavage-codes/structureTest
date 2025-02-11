import { Request, Response } from "express";
import TransactionService from "../service/transaction_service";
import ErrorHandler from "../utils/error_handler";
import OrderService from "../service/order_service";

const ordrService = new OrderService
const transactionService = new TransactionService;

export const createTransactionLogic = async (request: Request, response: Response) => {
    try {
        const { userId, order_id, amount, status, payment_method, payment_reference  }  = request.body

        if(!userId || !order_id || !amount) {
            return ErrorHandler.sendError(response, 400, "Miss Credential");
        } 

        const payLoad = {
            userId, 
            order_id, 
            amount, 
            status, 
            payment_method, 
            payment_reference
        }

        const orderExist = await ordrService.fetchOrderById(order_id)

        if(!orderExist) {
            return ErrorHandler.sendError(response, 404, "Order Not Found");
        }

        const transaction = await transactionService.createTransaction(payLoad);

        if(!transaction) {
            return ErrorHandler.sendError(response, 400, "Error Creating Transaction");
        }

        return response.status(200).json({
            success: true,
            message:"Transaction Created",
            transaction
        })
    } catch(error) {
        return ErrorHandler.sendError(response, 500, "Internal Server Error")
    }
}

export const fetchAllTransactionLogic = async (request: Request, response: Response) => {
    try {
        const transaction = await transactionService.fetchAllTransaction();

        if(!transaction || transaction.length === 0) {
            return ErrorHandler.sendError(response, 404, "");
        }

        return response.status(200).json({
            success: true,
            message:"Transactions Fetched",
            transaction
        })
    } catch(error) {
        return ErrorHandler.sendError(response, 500, "")   
    }
}

export const fetchUserTransactionLogic = async (request: Request, response: Response) => {
    try {
        const {userId} = request.body

        if(!userId) {
            return ErrorHandler.sendError(response, 404, ""); 
        }

        const transaction = await transactionService.fetchUserTransaction(userId);

        if(!transaction || transaction.length === 0) {
            return ErrorHandler.sendError(response, 404, "");
        }

        return response.status(200).json({
            success: true,
            message:"Transactions Fetched",
            transaction
        })
    } catch(error) {
        return ErrorHandler.sendError(response, 500, "")   
    }
}

export const fetchTransactionByIdLogic = async (request: Request, response: Response) => {
    try {
        const {transactionId} = request.params

        if(!transactionId) {
            return ErrorHandler.sendError(response, 404, ""); 
        }

        const transaction = await transactionService.fetchTransactionById(transactionId);

        if(!transaction) {
            return ErrorHandler.sendError(response, 404, "");
        }

        return response.status(200).json({
            success: true,
            message:"Transactions Fetched",
            transaction
        })
    } catch(error) {
        return ErrorHandler.sendError(response, 500, "")   
    }
}