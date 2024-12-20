import express from "express";
import { bikeControllers } from "./bike.controller";

const router = express.Router();

router.post("/", bikeControllers.createBike);
router.get("/", bikeControllers.getBikes);
router.get("/:productId", bikeControllers.getSingleBike);
router.put("/:productId", bikeControllers.updateABike);
router.delete("/:productId", bikeControllers.deleteBike);

export const bikeRoutes = router;
