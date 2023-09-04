import { Category } from "../entities";
import { categoryRepo } from "../repositories/category.repository";
import { CategoryCreate, TCategory } from "../interfaces/category.interfaces";
import { categorySchema } from "../schemas/category.schema";
import { AppError } from "../error";

export const create = async (payload: CategoryCreate): Promise<TCategory> => {
  const { name } = payload;
  
  const categoryExist: boolean = await categoryRepo.exist({ where: { name: name } });
  if (categoryExist) {
    throw new AppError("Category already exists", 409);
  }

  const category: Category = categoryRepo.create(payload);
  await categoryRepo.save(category);

  return categorySchema.parse(category);
};

export const read = async (): Promise<Category[]> => {
  const categories: Category[] = await categoryRepo.find();
  return categories;
};

export const retrieve = async (categoryId: number): Promise<TCategory | null> => {
  const categoryExists: boolean | null = await categoryRepo.exist({
    where: {
      id: categoryId,
    },
  });

  if (!categoryExists) {
    throw new AppError("Category not found", 404);
  }

  const category: Category | null = await categoryRepo.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      realEstate: true,
    },
  });

  return category;
};