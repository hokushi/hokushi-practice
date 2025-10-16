import { FastifyInstance } from "fastify";
import { registerSchema, loginSchema } from "../schemas/auth.js";
import { authController } from "../controllers/authController.js";

export async function authRoutes(fastify: FastifyInstance) {
  // ユーザー登録API
  fastify.post(
    "/api/register",
    { schema: registerSchema },
    authController.register
  );

  // ログインAPI
  fastify.post("/api/login", { schema: loginSchema }, authController.login);
}
