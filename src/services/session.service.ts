import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../error";
import { User } from "../entities";
import { userRepo } from "../repositories/user.repository";
import { SessionCreate, SessionReturn } from "../interfaces/session.interfaces";

export const createLogin = async ({
  email,
  password,
}: SessionCreate): Promise<SessionReturn> => {
  const foundUser: User | null = await userRepo.findOneBy({ email });
  if (!foundUser) throw new AppError("Invalid credentials", 401);

  const samePwd: boolean = await compare(password, foundUser.password);
  if (!samePwd) throw new AppError("Invalid credentials", 401);

  const token: string = sign(
    { admin: foundUser.admin },
    process.env.SECRET_KEY!,
    { subject: foundUser.id.toString(), expiresIn: process.env.EXPIRES_IN! }
  );

  return { token };
};