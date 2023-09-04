import { AppDataSource } from "../data-source";
import { RealEstate } from "../entities";
import { RealEstateRepo } from "../interfaces/realEstate.interfaces";

export const realEstateRepo: RealEstateRepo = AppDataSource.getRepository(RealEstate);
