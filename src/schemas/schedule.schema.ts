import { z } from "zod";

export const scheduleSchema = z.object({
  id: z.number().positive(),
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number().positive(),
  userId: z.number().positive(),
});

export const scheduleCreateSchema = scheduleSchema.omit({ id: true });
export const scheduleSchemaResponse = scheduleSchema.omit({ id: true, userId: true });