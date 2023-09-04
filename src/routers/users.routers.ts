import { Router } from "express";
import { deleteUser, getUsers, patchUser, postUser } from "../controllers/user.controllers";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schema";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { validateAdmin } from "../middlewares/validateAdmin.middleware";
import { verifyId } from "../middlewares/verifyId.middleware";

export const usersRouter: Router = Router();

usersRouter.post("", validateBody(userCreateSchema), postUser);

usersRouter.get("", verifyToken, validateAdmin, getUsers);

usersRouter.patch("/:id", verifyId, verifyToken, validateBody(userUpdateSchema), patchUser);

usersRouter.delete("/:id", verifyId, verifyToken, validateAdmin, deleteUser);