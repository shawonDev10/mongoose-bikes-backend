import mongoose from "mongoose";

interface Order {
  email: string;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}

export default Order;
