/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { bikeServices } from "./bike.service";

const createBike = async (req: Request, res: Response) => {
  try {
    const bike = req.body;
    const result = await bikeServices.createStudentIntoDB(bike);

    res.status(200).json({
      message: "Bike created successfully",
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err._message,
      success: false,
      error: err,
    });
  }
};

const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await bikeServices.getSingleBikeFromDB(productId);

    res.status(200).json({
      message: "Bike retrieved successfully",
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err.message,
      success: false,
      error: err,
    });
  }
};

export const bikeControllers = {
  createBike,
  getSingleBike,
};
