import { Router } from "express";
import CartController from "../controller/cart_controller";
import { authMiddleware } from "../middlewares/auth_middleware";

const cartController = new CartController();
const cartRoute = Router();

cartRoute.post('/create', authMiddleware, cartController.createCartController);
cartRoute.get('/', authMiddleware, cartController.fetchCartByIdController);
cartRoute.post('/add_item/', authMiddleware, cartController.addItemToCartController);
cartRoute.post('/remove_item/', authMiddleware, cartController.removeItemToCartController);
cartRoute.post('/clear_item/', authMiddleware, cartController.clearItemFromCartController);
cartRoute.delete('/', authMiddleware, cartController.removeCartController);

export default cartRoute;