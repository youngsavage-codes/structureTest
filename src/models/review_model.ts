import { model, Schema } from "mongoose";
import { IReview } from "../types/interface";

const reviewSchema = new Schema<IReview>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
  },
  { timestamps: true }
);

const Review = model<IReview>("Review", reviewSchema);

export default Review;
