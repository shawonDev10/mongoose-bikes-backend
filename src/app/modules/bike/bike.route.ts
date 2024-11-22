import express from "express";
import { bikeControllers } from "./bike.controller";

const router = express.Router();

router.post("/", bikeControllers.createBike);

export const bikeRoutes = router;
