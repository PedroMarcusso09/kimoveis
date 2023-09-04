import { Request, Response } from "express";
import { SessionReturn } from "../interfaces/session.interfaces";
import { createLogin } from "../services/session.service";

export const postLogin = async (req: Request, res: Response): Promise<Response> => {
  const token: SessionReturn = await createLogin(req.body);
  
  return res.status(200).json(token);
};