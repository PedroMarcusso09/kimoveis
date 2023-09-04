import { NextFunction, Request, Response } from "express";
import { AppError } from "../error";
import { User } from "../entities";
import { userRepo } from '../repositories/user.repository';

export const verifyId = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id: number = Number(req.params.id);

  const user: User | null = await userRepo.findOne({ where: { id } });
  if (!user) { throw new AppError("User not found", 404) };

  res.locals = { ...res.locals, user };

  return next();
};