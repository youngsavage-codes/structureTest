import { Request, Response } from "express";
import { acceptPaymentLogic, verifyPaymentLogic } from "../logics/payment_logic";

class PaymentControler  {
    async acceptPayment(request: Request, response: Response) {
        try {
            return await acceptPaymentLogic(request, response);
        } catch(error) {
            return null
        }
    }

    async verifyPayment(request: Request, response: Response) {
        try {
            return await verifyPaymentLogic(request, response);
        } catch(error) {
            return null
        }
    }
}

export default PaymentControler