import { Router } from "express";
import PaymentControler from "../controller/payment_controller";
import { authMiddleware } from "../middlewares/auth_middleware";

const paymentController = new PaymentControler();
const paymentRoute = Router();

paymentRoute.post('/initialize', authMiddleware, paymentController.acceptPayment);
paymentRoute.post('/verify/:reference', paymentController.verifyPayment);

export default paymentRoute;