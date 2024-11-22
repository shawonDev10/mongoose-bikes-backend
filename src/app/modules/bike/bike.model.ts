import { model, Schema } from "mongoose";
import Bike from "./bike.interface";

const BikeSchema = new Schema<Bike>(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    brand: {
      type: String,
      required: [true, "brand is required"],
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "Price must be a positive number"],
    },
    category: {
      type: String,
      enum: {
        values: ["Mountain", "Road", "Hybrid", "Electric"],
        message: "category must be one of Mountain, Road, Hybrid, Electric",
      },
      required: [true, "category is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    quantity: {
      type: Number,
      required: [true, "quantity is required"],
    },
    inStock: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const BikeModel = model<Bike>("bike", BikeSchema);

export default BikeModel;
