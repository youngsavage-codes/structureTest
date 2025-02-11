import { Router } from "express";
import TransactionController from "../controller/transaction_controller";
import { authMiddleware } from "../middlewares/auth_middleware";

const transactionController = new TransactionController
const transactionRoute = Router();

transactionRoute.get('/', transactionController.fetchAllTransactionController);
transactionRoute.get('/user', authMiddleware, transactionController.fetchUserTransactionController);
transactionRoute.get('/:transactionId', transactionController.fetchTransactionByIdController);
transactionRoute.post('/create', authMiddleware, transactionController.creatTransactionController);

export default transactionRoute;