import { z } from "zod";

export const errorSchema = z.object({
  error: z.string(),
});

export const gameSchema = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  size: z.number(),
  createdAt: z.string(),
});

export const getMyGamesSchema = {
  response: {
    200: z.object({
      message: z.string(),
      games: z.array(gameSchema),
      count: z.number(),
    }),
    401: errorSchema,
    500: errorSchema,
  },
};
