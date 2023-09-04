import { AppDataSource } from "../data-source";
import { Category } from "../entities";
import { CategoryRepo } from "../interfaces/category.interfaces";

export const categoryRepo: CategoryRepo = AppDataSource.getRepository(Category);
