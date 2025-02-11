import { model, Schema } from "mongoose";
import { IProduct } from "../types/interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    brand: { type: String },
    stock: { type: Number, required: true, min: 0 },
    images: { type: [String], required: true },
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    reviews: [
      {
        reviewId: { type: Schema.Types.ObjectId, ref: "Review" },
      },
    ],
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
