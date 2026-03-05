import { z } from "zod";

export const userSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  createdAt: z.string(),
  isAdmin: z.boolean(),
});

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  isAdmin: z.boolean(),
});

export const errorSchema = z.object({
  error: z.string(),
});

export const adminRegisterBodySchema = z.object({
  isAdmin: z.boolean(),
});

export type AdminRegisterBody = z.infer<typeof adminRegisterBodySchema>;

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

export const getMeSchema = {
  response: {
    200: z.object({
      message: z.string(),
      user: userSchema,
    }),
    401: errorSchema,
    404: errorSchema,
    500: errorSchema,
  },
};

export const adminRegisterSchema = {
  body: adminRegisterBodySchema,
  response: {
    200: z.object({
      message: z.string(),
      user: userSchema,
    }),
    400: errorSchema,
    500: errorSchema,
  },
};
