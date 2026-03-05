import { z } from "zod";

export const createGameBodySchema = z.object({
  name: z.string().min(1),
  size: z.union([z.literal(4), z.literal(6), z.literal(8)]),
});

export type CreateGameBody = z.infer<typeof createGameBodySchema>;

export const gameSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  size: z.number(),
  createdAt: z.string(),
});

export const createGameSchema = {
  body: createGameBodySchema,
  response: {
    201: z.object({
      message: z.string(),
      game: gameSchema,
    }),
    401: z.object({
      error: z.string(),
    }),
    500: z.object({
      error: z.string(),
    }),
  },
};
