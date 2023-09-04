import { AppDataSource } from "../data-source";
import { Address } from "../entities";
import { AddressRepo } from "../interfaces/address.interfaces";

export const addressRepo: AddressRepo = AppDataSource.getRepository(Address);
