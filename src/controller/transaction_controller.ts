import { Request, Response } from "express";
import { 
    createTransactionLogic, 
    fetchAllTransactionLogic, 
    fetchTransactionByIdLogic, 
    fetchUserTransactionLogic } from "../logics/transaction_logic";

class TransactionController {
    async creatTransactionController(request:Request, response: Response) {
        try {
            return await createTransactionLogic(request, response);
        } catch(error) {
            return 
        }
    }

    async fetchAllTransactionController(request:Request, response: Response) {
        try {
            return await fetchAllTransactionLogic(request, response)
        } catch(error) {
            return 
        }
    }

    async fetchUserTransactionController(request:Request, response: Response) {
        try {
            return await fetchUserTransactionLogic(request, response)
        } catch(error) {
            return 
        }
    }

    async fetchTransactionByIdController(request:Request, response: Response) {
        try {
            return await fetchTransactionByIdLogic(request, response)
        } catch(error) {
            return 
        }
    }
}  

export default TransactionController