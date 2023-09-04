import { Request, Response } from "express";
import { RealEstate } from "../entities";
import { RealEstateReturn } from "../interfaces/realEstate.interfaces";
import { create, read } from "../services/realEstate.services";

export const postRealEstate = async (req: Request, res: Response): Promise<Response> => {
  const realEstate: RealEstateReturn = res.locals.validated;
  const newRealEstate: RealEstate = await create(realEstate);

  return res.status(201).json(newRealEstate);
};

export const getRealEstate = async (req: Request, res: Response): Promise<Response> => {
  const realEstate: RealEstate[] = await read();

  return res.status(200).json(realEstate);
};