import { NextFunction, Request, Response } from "express";
import { realEstateRepo } from "../repositories/realEstate.repository";
import { AppError } from "../error";

export const verifyRealEstate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const realEstateId: number = +req.params.id;

  const isRealEstate = await realEstateRepo.findOne({
    where: { id: realEstateId },
  });

  if (!isRealEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return next();
};