import { AppDataSource } from "../data-source";
import { Schedule } from "../entities";
import { ScheduleRepo } from "../interfaces/schedule.interfaces";

export const scheduleRepo: ScheduleRepo = AppDataSource.getRepository(Schedule);