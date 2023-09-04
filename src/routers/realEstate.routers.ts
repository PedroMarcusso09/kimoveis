import { Router } from "express";
import { getRealEstate, postRealEstate } from "../controllers/realEstate.controllers";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { createRealEstateWithCategoryId } from "../schemas/realEstate.schema";

export const realEstateRouter: Router = Router();

realEstateRouter.post("", verifyToken, validateAdmin, validateBody(createRealEstateWithCategoryId), postRealEstate);

realEstateRouter.get("", getRealEstate);