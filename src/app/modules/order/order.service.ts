import { bikeServices } from "../bike/bike.service";
import Order from "./order.interface";
import orderModel from "./order.model";

const createOrderIntoDB = async (order: Order) => {
  const { product, quantity } = order;

  const bikeDoc = await bikeServices.getSingleBikeFromDB(product);

  if (!bikeDoc) {
    throw new Error("document not found");
  } else if (bikeDoc.quantity < quantity) {
    throw new Error(
      `insufficient stock. available quantity is ${bikeDoc.quantity}`,
    );
  } else {
    bikeDoc.quantity -= quantity;
    if (bikeDoc.quantity === 0) {
      bikeDoc.inStock = false;
    }
    await bikeDoc.save();
  }

  const result = await orderModel.create(order);
  return result;
};

const getRevenueFromOrder = async () => {
  const result = await orderModel.aggregate([
    {
      $addFields: { bikeObjId: { $toObjectId: "$product" } },
    },
    {
      $lookup: {
        from: "bikes",
        localField: "bikeObjId",
        foreignField: "_id",
        as: "bikeDetails",
      },
    },
    {
      $unwind: "$bikeDetails",
    },
    {
      $group: {
        _id: null,
        revenue: { $sum: { $multiply: ["$bikeDetails.price", "$quantity"] } },
      },
    },
  ]);

  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getRevenueFromOrder,
};
