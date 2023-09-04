import { Router } from "express";
import { getSchedulesById, postSchedule } from "../controllers/schedules.controllers";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import { scheduleSchemaResponse } from "../schemas/schedule.schema";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";
import { verifyRealEstate } from "../middlewares/verifyRealEstate.middleware";

export const schedulesRouter: Router = Router();

schedulesRouter.post("", verifyToken, validateBody(scheduleSchemaResponse), postSchedule);

schedulesRouter.get("/realEstate/:id", verifyToken, validateAdmin, verifyRealEstate, getSchedulesById);