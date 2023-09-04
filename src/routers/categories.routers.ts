import { Router } from "express";
import { getCategories, getRealEstateByCategory, postCategory } from "../controllers/categories.controllers";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schema";

export const categoriesRouter: Router = Router();

categoriesRouter.post("", verifyToken, validateAdmin, validateBody(categoryCreateSchema), postCategory);

categoriesRouter.get("", getCategories);

categoriesRouter.get("/:id/realEstate", getRealEstateByCategory);