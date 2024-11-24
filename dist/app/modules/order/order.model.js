"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: [true, "email is required"],
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "product id is required"],
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
}, {
    timestamps: true,
});
const orderModel = (0, mongoose_1.model)("order", OrderSchema);
exports.default = orderModel;
