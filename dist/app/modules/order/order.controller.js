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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const validator_1 = __importDefault(require("validator"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        if (!validator_1.default.isEmail(order.email)) {
            res.status(500).json({
                message: "invalid email format",
                success: false,
            });
        }
        const result = yield order_service_1.orderServices.createOrderIntoDB(order);
        res.status(200).json({
            message: "Order created successfully",
            success: true,
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err._message,
            success: false,
            error: err,
            stack: err.stack,
        });
    }
});
const getRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.orderServices.getRevenueFromOrder();
        res.status(200).json({
            message: "Revenue calculated successfully",
            success: true,
            totalRevenue: result[0].revenue,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err._message,
            success: false,
            error: err,
            stack: err.stack,
        });
    }
});
exports.orderController = {
    createOrder,
    getRevenue,
};
