import { Router } from "express";
import OrderController from "../controller/order_controller";
import { authMiddleware } from "../middlewares/auth_middleware";

const orderController = new OrderController();
const orderRoute = Router();

orderRoute.post('/create', authMiddleware, orderController.createOrderController);
orderRoute.get('/', orderController.fetchAllOrderController);
orderRoute.get('/user_order', authMiddleware, orderController.fetchUserOrderController);
orderRoute.get('/:orderId', orderController.fetchOrderByIdController);

export default orderRoute;