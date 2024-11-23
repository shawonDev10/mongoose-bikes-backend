import { model, Schema } from "mongoose";
import Order from "./order.interface";

const OrderSchema = new Schema<Order>(
  {
    email: {
      type: String,
      required: [true, "email is required"],
    },
    product: {
      type: String,
      required: [true, "product is required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
      min: [0, "quantity must be a positive number"],
    },
    totalPrice: {
      type: Number,
      required: [true, "totalPrice is required"],
      min: [0, "totalPrice must be a positive number"],
    },
  },
  {
    timestamps: true,
  },
);

const orderModel = model<Order>("order", OrderSchema);

export default orderModel;
