import { Router } from "express";
import { postLogin } from "../controllers/session.controllers";
import { validateBody } from "../middlewares/validateBody.middleware";
import { sessionSchema } from "../schemas/session.schema";

export const loginRouter: Router = Router();

loginRouter.post("", validateBody(sessionSchema), postLogin);