import { RealEstate } from "../entities";
import { scheduleRepo} from "../repositories/schedule.repository";
import { realEstateRepo } from "../repositories/realEstate.repository";
import { userRepo } from "../repositories/user.repository";
import { TSchedule } from "../interfaces/schedule.interfaces";
import { AppError } from "../error";

export const create = async (payload: TSchedule, userId: number): Promise<object> => {
  const { date, hour, realEstateId } = payload;
  const newDate = new Date(date);
  const workDay = newDate.getDay();
  if (workDay === 0 || workDay === 6) {
    throw new AppError("Invalid date, work days are monday to friday", 400);
  }
  const formattedHour = hour.split(":");
  const newHour = parseInt(formattedHour[0]);
  if (newHour >= 18 || newHour < 8) {
    throw new AppError("Invalid hour, available times are 8AM to 18PM", 400);
  }

  const user = await userRepo.findOneBy({ id: userId });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const realEstate = await realEstateRepo.findOneBy({ id: realEstateId });
  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  const existingScheduleForRealEstate = await scheduleRepo
    .createQueryBuilder("s")
    .where("s.date = :date AND s.hour = :hour AND s.realEstateId = :realEstateId", {
      date,
      hour,
      realEstateId,
    })
    .getOne();
  if (existingScheduleForRealEstate) {
    throw new AppError("Schedule to this real estate at this date and time already exists", 409);
  }

  const existingScheduleForUser = await scheduleRepo
    .createQueryBuilder("s")
    .where("s.user = :userId AND s.date = :date AND s.hour = :hour", {
      userId,
      date,
      hour,
    })
    .getOne();
  if (existingScheduleForUser) {
    throw new AppError("User schedule to this real estate at this date and time already exists", 409);
  }

  const newSchedule = scheduleRepo.create({
    ...payload,
    realEstate,
    user,
  });
  await scheduleRepo.save(newSchedule);

  return { message: "Schedule created" };
};

export const read = async (id: number): Promise<RealEstate> => {
  const realEstate: RealEstate | null = await realEstateRepo.findOne({
    where: { id },
    relations: {
      address: true,
      category: true,
      schedules: { user: true },
    },
  });

  if (!realEstate) {
    throw new AppError("RealEstate not found", 404);
  }

  return realEstate;
};