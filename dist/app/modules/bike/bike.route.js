"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bike_controller_1 = require("./bike.controller");
const router = express_1.default.Router();
router.post("/", bike_controller_1.bikeControllers.createBike);
router.get("/", bike_controller_1.bikeControllers.getBikes);
router.get("/:productId", bike_controller_1.bikeControllers.getSingleBike);
router.put("/:productId", bike_controller_1.bikeControllers.updateABike);
router.delete("/:productId", bike_controller_1.bikeControllers.deleteBike);
exports.bikeRoutes = router;
