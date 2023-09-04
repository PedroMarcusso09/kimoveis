import { User } from "../entities";
import { userRepo } from '../repositories/user.repository';
import { UserCreate, UserRead, UserReturn, UserUpdate } from "../interfaces/user.interfaces";
import { userReadSchema, userReturnSchema } from "../schemas/user.schema";
import { AppError } from '../error';

export const create = async (payload: UserCreate): Promise<UserReturn> => {
  const email: string = payload.email;
  const userExists: boolean = !!(await userRepo.findOne({ where: { email } }));
  if (userExists) {
    throw new AppError('Email already exists', 409);
  }

  const user: User = userRepo.create(payload);
  await userRepo.save(user);

  return userReturnSchema.parse(user);
};

export const read = async (): Promise<UserRead> => {
  const users = await userRepo.find();
  
  return userReadSchema.parse(users);
};

export const update = async (userId: number, payload: UserUpdate, authUserId: number, isAdmin: boolean): Promise<UserReturn> => {
  if (isAdmin === false && userId !== authUserId) {
    throw new AppError("Insufficient permission", 403);
  }

  const user: User | null = await userRepo.findOne({ where: { id: userId } });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const updatedUser = { ...user, ...payload };

  await userRepo.save(updatedUser);

  return userReturnSchema.parse(updatedUser);
};


export const destroy = async (user: User): Promise<void> => {
  await userRepo.softRemove(user);
};