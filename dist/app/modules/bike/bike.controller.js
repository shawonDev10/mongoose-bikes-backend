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
Object.defineProperty(exports, "__esModule", { value: true });
exports.bikeControllers = void 0;
const bike_service_1 = require("./bike.service");
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bike = req.body;
        const result = yield bike_service_1.bikeServices.createStudentIntoDB(bike);
        res.status(200).json({
            message: "Bike created successfully",
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
const getBikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        if (searchTerm && typeof searchTerm !== "string") {
            res.status(400).json({ message: "missing Invalid searchTerm" });
        }
        else if (searchTerm && typeof searchTerm === "string") {
            const result = yield bike_service_1.bikeServices.getSearchBikeFromDB(searchTerm);
            if (result.length === 0) {
                res.status(404).json({
                    message: "Bikes not found",
                    success: false,
                    data: result,
                });
            }
            else {
                res.status(200).json({
                    message: "Bikes retrieved successfully",
                    success: true,
                    data: result,
                });
            }
        }
        else {
            const result = yield bike_service_1.bikeServices.getAllBikesFromDB();
            res.status(200).json({
                message: "Bikes retrieved successfully",
                success: true,
                data: result,
            });
        }
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
const getSingleBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield bike_service_1.bikeServices.getSingleBikeFromDB(productId);
        res.status(200).json({
            message: "Bike retrieved successfully",
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
const updateABike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const newValue = req.body;
        const result = yield bike_service_1.bikeServices.updateABikeFromDB(productId, newValue);
        res.status(200).json({
            message: "Bike updated successfully",
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
const deleteBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield bike_service_1.bikeServices.deleteBikeFromDB(productId);
        if (result) {
            res.status(200).json({
                message: "Bike deleted successfully",
                success: true,
                data: {},
            });
        }
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
exports.bikeControllers = {
    createBike,
    getBikes,
    getSingleBike,
    updateABike,
    deleteBike,
};
