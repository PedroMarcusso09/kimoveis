import { RealEstate } from "../entities";
import { realEstateRepo  } from "../repositories/realEstate.repository";
import { addressRepo } from "../repositories/address.repository";
import { categoryRepo } from "../repositories/category.repository";
import { RealEstateReturn } from "../interfaces/realEstate.interfaces";
import { AppError } from "../error";

export const create = async (payload: RealEstateReturn): Promise<RealEstate> => {
  const { categoryId, size, value, address: payloadAddress } = payload;
  const { street, zipCode, city, state, number } = payloadAddress;

  const category = await categoryRepo.findOne({ where: { id: categoryId } });
  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const validAddress = await addressRepo.exist({
    where: { street, zipCode, city, state }
  });
  if (validAddress) {
    throw new AppError("Address already exists", 409);
  }

  const address = addressRepo.create({
    street, zipCode, city, state, number: number ?? null
  });
  await addressRepo.save(address);

  const newRealEstate: RealEstate = realEstateRepo.create({
    address,
    category,
    size,
    value: +value
  });
  await realEstateRepo.save(newRealEstate);

  return newRealEstate;
};

export const read = async (): Promise<RealEstate[]> => {
  const realEstates = await realEstateRepo.find({ relations: { address: true } });
  return realEstates;
};