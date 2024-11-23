/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { orderServices } from "./order.service";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
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
    });
  }
};

export const orderController = {
  createOrder,
};
