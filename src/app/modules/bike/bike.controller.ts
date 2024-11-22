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
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      success: true,
      data: err,
    });
  }
};

export const bikeControllers = {
  createBike,
};
