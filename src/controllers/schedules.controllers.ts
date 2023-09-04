import { Request, Response } from "express";
import { RealEstate } from "../entities";
import { TSchedule } from "../interfaces/schedule.interfaces";
import { create, read } from "../services/schedules.services";

export const postSchedule = async (req: Request, res: Response): Promise<Response> => {
  const schedule: TSchedule = req.body;
  const userId: number = +res.locals.decoded.sub;
  const newSchedule: object = await create(schedule, userId);

  return res.status(201).json(newSchedule);
};

export const getSchedulesById = async (req: Request, res: Response): Promise<Response> => {
  const id: number = +res.locals.decoded.sub;
  const realEstate: RealEstate = await read(id);

  return res.status(200).json(realEstate);
};