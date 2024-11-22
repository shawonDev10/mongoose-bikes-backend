import Bike from "./bike.interface";
import BikeModel from "./bike.model";

const createStudentIntoDB = async (bike: Bike) => {
  const result = await BikeModel.create(bike);
  return result;
};

export const bikeServices = {
  createStudentIntoDB,
};
