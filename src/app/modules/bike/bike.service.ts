import Bike from "./bike.interface";
import BikeModel from "./bike.model";

const createStudentIntoDB = async (bike: Bike) => {
  const result = await BikeModel.create(bike);
  return result;
};

const getAllBikesFromDB = async () => {
  const result = await BikeModel.find({}, { isDeleted: 0 });
  return result;
};

const getSingleBikeFromDB = async (_id: string) => {
  const result = await BikeModel.findOne({ _id }, { isDeleted: 0 });
  return result;
};

const getSearchBikeFromDB = async (text: string) => {
  const result = await BikeModel.find(
    {
      $or: [
        { name: { $regex: text, $options: "i" } },
        { brand: { $regex: text, $options: "i" } },
        { category: { $regex: text, $options: "i" } },
      ],
    },
    { isDeleted: 0 },
  );
  return result;
};

const updateABikeFromDB = async (_id: string, value: object) => {
  const bikeDocument = await BikeModel.findOne({ _id });
  if (!bikeDocument) {
    throw new Error("document not found");
  }

  for (const field of Object.keys(value)) {
    if (!(field in bikeDocument.toObject())) {
      throw new Error(`field ${field} does not exist in the document`);
    }
  }
  const result = await BikeModel.findOneAndUpdate({ _id }, value, {
    new: true,
    runValidators: true,
  }).select({ isDeleted: 0 });
  return result;
};

const deleteBikeFromDB = async (_id: string) => {
  const result = await BikeModel.updateOne({ _id }, { isDeleted: true });
  return result;
};

export const bikeServices = {
  createStudentIntoDB,
  getAllBikesFromDB,
  getSingleBikeFromDB,
  getSearchBikeFromDB,
  updateABikeFromDB,
  deleteBikeFromDB,
};
