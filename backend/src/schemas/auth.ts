import { z } from "zod";

// Schema for user registration
export const registerBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  isAdmin: z.boolean(),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;

export const registerSchema = {
  body: registerBodySchema,
};

// Schema for user login
export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginBody = z.infer<typeof loginBodySchema>;

const loginUserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  isAdmin: z.boolean(),
});

export const loginSchema = {
  body: loginBodySchema,
  response: {
    200: z.object({
      message: z.string(),
      user: loginUserSchema,
    }),
  },
};
