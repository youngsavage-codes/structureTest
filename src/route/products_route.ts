import ProductController from "../controller/products_controller";
import { Router } from "express";

const productController = new ProductController();
const productRoute = Router();

productRoute.post('/add', productController.addProductController);
productRoute.get('/', productController.fetchAllProductController);
productRoute.get('/:productId', productController.fetchSingleProductController);
productRoute.put('/:productId', productController.updateProductController);
productRoute.delete('/:productId', productController.removeProductController);

export default productRoute;