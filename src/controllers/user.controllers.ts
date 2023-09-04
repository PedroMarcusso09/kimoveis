import { Request, Response } from "express";
import { UserRead, UserReturn, UserUpdate } from "../interfaces/user.interfaces";
import { create, read, update, destroy } from "../services/user.services";

export const postUser = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await create(req.body);

  return res.status(201).json(user);
};

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await read();

  return res.status(200).json(users);
};

export const patchUser = async (req: Request, res: Response): Promise<Response> => {
  const payload: UserUpdate = res.locals.validated;
  const foundUser: number = +req.params.id;
  const authUserId = +res.locals.decoded.sub;
  const isAdmin = res.locals.decoded.admin;
  const user: UserReturn = await update(foundUser, payload, authUserId, isAdmin);

  return res.status(200).json(user);
};


export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  await destroy(res.locals.user);

  return res.status(204).json();
};