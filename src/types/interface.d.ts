import { Types } from "mongoose";

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    isAccountVerified?: boolean;
    verifyOtp?: string;
    verifyOtpExpiresAt?: number;
    resetOtp?: string;
    resetOtpExpiresAt?: number;
    save?: any;
}

export interface ICart {
    _id?: string;
    user_id: Types.ObjectId; // Refers to the user who owns the cart
    products: {                // Array of products in the cart
        product_id: Types.ObjectId; // Refers to the product added to the cart
        quantity: number;    // Number of products
        total?: number;      // Optional: Can be computed dynamically
    }[];
    save?: any;
    createdAt?: Date; // Optional: Timestamp for creation
    updatedAt?: Date; // Optional: Timestamp for updates
}

export interface IProduct {
    id: string;  // Unique product identifier
    name: string;
    description: string;
    price: number;
    category: string;
    brand?: string;
    stock: number; // Quantity available
    images: string[]; // Array of image URLs
    ratings?: number; // Average rating (optional)
    reviews?: IReview[]; // Array of reviews (optional)
    isFeatured?: boolean; // Flag for featured products
    createdAt: Date;
    updatedAt: Date;
}

// Optional review interface
export interface IReview {
    user_id: Types.ObjectId; // Refers to the user who owns the cart
    product_id: Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
}

export interface IOrder {
    user_id: Types.ObjectId;
    products: { 
        product_id: Types.ObjectId; 
        quantity: number; 
        amount: number;
    }[];
    total: number;
    payment_status: "pending" | "paid" | "failed";
    createdAt?: Date;
    updatedAt?: Date;
    save: any;
}

export interface ITransaction {
    user_id: Types.ObjectId;
    order_id: Types.ObjectId;
    amount: number;
    status: "pending" | "completed" | "failed";
    payment_method: "card" | "bank_transfer" | "crypto" | "not paid";
    payment_reference: string;
    createdAt?: Date;
    updatedAt?: Date;
}