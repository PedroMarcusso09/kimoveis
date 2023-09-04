import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { UserRepo } from "../interfaces/user.interfaces";

export const userRepo: UserRepo = AppDataSource.getRepository(User);