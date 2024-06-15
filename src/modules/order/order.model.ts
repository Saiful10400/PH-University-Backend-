
import { Schema, model } from "mongoose";
import { orderType } from "./type.order";

// Define the order schema.
export const orderSchema=new Schema<orderType>({
    email: { type: String, required: true },
    productId: { type: String, required: true, ref: 'Product' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

// export the order model.
export const orderModel=model("order",orderSchema)