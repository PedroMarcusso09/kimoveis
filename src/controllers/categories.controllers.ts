import { Request, Response } from "express";
import { CategoryCreate, CategoryRead, TCategory } from "../interfaces/category.interfaces";
import { create, read, retrieve } from "../services/categories.services";

export const postCategory = async (req: Request, res: Response): Promise<Response> => {
  const category: CategoryCreate = req.body;
  const newCategory: TCategory = await create(category);

  return res.status(201).json(newCategory);
};

export const getCategories = async (req: Request, res: Response): Promise<Response> => {
  const categories: CategoryRead = await read();

  return res.status(200).json(categories);
};

export const getRealEstateByCategory = async (req: Request, res: Response): Promise<Response> => {
  const id: number = +req.params.id;
  const category: TCategory | null = await retrieve(id);

  return res.status(200).json(category);
};