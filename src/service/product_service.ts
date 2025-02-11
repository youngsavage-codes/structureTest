import Product from "../models/products_model";
import { IProduct } from "../types/interface";

class ProductService {
    async addProduct(data: Partial<IProduct>): Promise<IProduct | null> {
        try {
            const newProduct = new Product(data);
            await newProduct.save();
            return newProduct
        } catch(error) {
            return null
        }
    } 

    async fetchAllProduct(): Promise<IProduct[] | null> {
        try {
            return Product.find();
        } catch(error) {
            return null
        }
    }

    async fetchSingleProductById(productId: string): Promise<IProduct | null> {
        try  {
            return Product.findById(productId);
        } catch(error) {
            return null
        }
    }

    async updateProduct(productId: string, updateData: Partial<IProduct>): Promise<IProduct | null> {
        try {
            return await Product.findByIdAndUpdate(productId, updateData, { new: true });
        } catch (error) {
            console.error("Error updating product:", error);
            return null;
        }
    }

    async removeProduct(productId: string): Promise<IProduct | null> {
        try {
            return Product.findByIdAndDelete(productId);
        } catch(error) {
            return null
        }
    }
}

export default ProductService 