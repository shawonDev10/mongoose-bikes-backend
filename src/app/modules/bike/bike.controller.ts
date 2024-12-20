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
      stack: err.stack,
    });
  }
};

const getBikes = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm && typeof searchTerm !== "string") {
      res.status(400).json({ message: "missing Invalid searchTerm" });
    } else if (searchTerm && typeof searchTerm === "string") {
      const result = await bikeServices.getSearchBikeFromDB(searchTerm);

      if (result.length === 0) {
        res.status(404).json({
          message: "Bikes not found",
          success: false,
          data: result,
        });
      } else {
        res.status(200).json({
          message: "Bikes retrieved successfully",
          success: true,
          data: result,
        });
      }
    } else {
      const result = await bikeServices.getAllBikesFromDB();

      res.status(200).json({
        message: "Bikes retrieved successfully",
        success: true,
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      message: err._message,
      success: false,
      error: err,
      stack: err.stack,
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
      message: err._message,
      success: false,
      error: err,
      stack: err.stack,
    });
  }
};

const updateABike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const newValue = req.body;
    const result = await bikeServices.updateABikeFromDB(productId, newValue);

    res.status(200).json({
      message: "Bike updated successfully",
      success: true,
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      message: err._message,
      success: false,
      error: err,
      stack: err.stack,
    });
  }
};

const deleteBike = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await bikeServices.deleteBikeFromDB(productId);

    if (result) {
      res.status(200).json({
        message: "Bike deleted successfully",
        success: true,
        data: {},
      });
    }
  } catch (err: any) {
    res.status(500).json({
      message: err._message,
      success: false,
      error: err,
      stack: err.stack,
    });
  }
};

export const bikeControllers = {
  createBike,
  getBikes,
  getSingleBike,
  updateABike,
  deleteBike,
};
