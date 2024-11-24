/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { orderServices } from "./order.service";
import validator from "validator";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;

    if (!validator.isEmail(order.email)) {
      res.status(500).json({
        message: "invalid email format",
        success: false,
      });
    }

    const result = await orderServices.createOrderIntoDB(order);

    res.status(200).json({
      message: "Order created successfully",
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

const getRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getRevenueFromOrder();

    res.status(200).json({
      message: "Revenue calculated successfully",
      success: true,
      totalRevenue: result[0].revenue,
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

export const orderController = {
  createOrder,
  getRevenue,
};
