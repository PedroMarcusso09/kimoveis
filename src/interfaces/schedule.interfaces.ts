import { z } from "zod";
import { Repository } from "typeorm";
import { scheduleCreateSchema, scheduleSchema, scheduleSchemaResponse } from "../schemas/schedule.schema";
import { Schedule } from "../entities";

export type TSchedule = z.infer<typeof scheduleSchemaResponse>;
export type ScheduleCreate = z.infer<typeof scheduleCreateSchema>;
export type ScheduleReturn = z.infer<typeof scheduleSchema>;
export type ScheduleRepo = Repository<Schedule>;