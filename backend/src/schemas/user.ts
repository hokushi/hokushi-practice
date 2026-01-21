import { z } from "zod";

const userSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  createdAt: z.string(),
  isAdmin: z.boolean(),
});

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  isAdmin: z.boolean(),
});

const errorSchema = z.object({
  error: z.string(),
});

export const getAllUserSchema = {
  response: {
    200: z.object({
      message: z.string(),
      users: z.array(userSummarySchema),
      count: z.number(),
    }),
    500: errorSchema,
  },
};

export const adminRegisterSchema = {
  body: z.object({
    isAdmin: z.boolean(),
  }),
  response: {
    200: z.object({
      message: z.string(),
      user: userSchema,
    }),
    400: errorSchema,
    500: errorSchema,
  },
};
