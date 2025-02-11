"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
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
            reviewId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Review" },
        },
    ],
    isFeatured: { type: Boolean, default: false },
}, { timestamps: true });
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
