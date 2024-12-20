"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const bike_route_1 = require("./app/modules/bike/bike.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
// Parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Application Routes
app.use("/api/products", bike_route_1.bikeRoutes);
app.use("/api/orders", order_route_1.orderRoutes);
app.get("/", (req, res) => {
    res.send("Bike Store Is Running");
});
exports.default = app;
