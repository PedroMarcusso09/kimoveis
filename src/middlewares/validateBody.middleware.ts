import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validateBody =
  (schema: ZodTypeAny) =>
  ( req: Request, res: Response, next: NextFunction ): void => {
    const validated = schema.parse(req.body);
    res.locals = { ...res.locals, validated };

    return next();
  };