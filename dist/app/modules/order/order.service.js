"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const bike_service_1 = require("../bike/bike.service");
const order_model_1 = __importDefault(require("./order.model"));
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { product, quantity } = order;
    const bikeDoc = yield bike_service_1.bikeServices.getSingleBikeFromDB(product.toString());
    if (!bikeDoc) {
        throw new Error("document not found");
    }
    else if (bikeDoc.quantity < quantity) {
        throw new Error(`insufficient stock. available quantity is ${bikeDoc.quantity}`);
    }
    else {
        bikeDoc.quantity -= quantity;
        if (bikeDoc.quantity === 0) {
            bikeDoc.inStock = false;
        }
        yield bikeDoc.save();
    }
    const result = yield order_model_1.default.create(order);
    return result;
});
const getRevenueFromOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.aggregate([
        {
            $lookup: {
                from: "bikes",
                localField: "product",
                foreignField: "_id",
                as: "bikeDetails",
            },
        },
        {
            $unwind: "$bikeDetails",
        },
        {
            $group: {
                _id: null,
                revenue: { $sum: { $multiply: ["$bikeDetails.price", "$quantity"] } },
            },
        },
    ]);
    return result;
});
exports.orderServices = {
    createOrderIntoDB,
    getRevenueFromOrder,
};
