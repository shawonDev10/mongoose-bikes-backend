"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BikeSchema = new mongoose_1.Schema({
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
        min: [0, "quantity must be a positive number"],
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
BikeSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
BikeSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
const BikeModel = (0, mongoose_1.model)("bike", BikeSchema);
exports.default = BikeModel;
