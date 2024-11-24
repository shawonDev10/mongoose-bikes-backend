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
exports.bikeServices = void 0;
const bike_model_1 = __importDefault(require("./bike.model"));
const createStudentIntoDB = (bike) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.default.create(bike);
    return result;
});
const getAllBikesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.default.find({}, { isDeleted: 0 });
    return result;
});
const getSingleBikeFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.default.findOne({ _id }, { isDeleted: 0 });
    return result;
});
const getSearchBikeFromDB = (text) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.default.find({
        $or: [
            { name: { $regex: text, $options: "i" } },
            { brand: { $regex: text, $options: "i" } },
            { category: { $regex: text, $options: "i" } },
        ],
    }, { isDeleted: 0 });
    return result;
});
const updateABikeFromDB = (_id, value) => __awaiter(void 0, void 0, void 0, function* () {
    const bikeDocument = yield bike_model_1.default.findOne({ _id });
    if (!bikeDocument) {
        throw new Error("document not found");
    }
    for (const field of Object.keys(value)) {
        if (!(field in bikeDocument.toObject())) {
            throw new Error(`field ${field} does not exist in the document`);
        }
    }
    const result = yield bike_model_1.default.findOneAndUpdate({ _id }, value, {
        new: true,
        runValidators: true,
    }).select({ isDeleted: 0 });
    return result;
});
const deleteBikeFromDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.default.updateOne({ _id }, { isDeleted: true });
    return result;
});
exports.bikeServices = {
    createStudentIntoDB,
    getAllBikesFromDB,
    getSingleBikeFromDB,
    getSearchBikeFromDB,
    updateABikeFromDB,
    deleteBikeFromDB,
};
