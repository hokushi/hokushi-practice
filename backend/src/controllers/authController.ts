import { FastifyRequest, FastifyReply } from "fastify";
import { authService } from "../services/authService.js";
import { AppError } from "../errors/AppError.js";
import type { LoginBody, RegisterBody } from "../schemas/auth.js";

export const authController = {
  // ユーザー登録
  async register(
    request: FastifyRequest<{ Body: RegisterBody }>,
    reply: FastifyReply,
  ) {
    try {
      const { name, email, password, isAdmin } = request.body;

      const newUser = await authService.register(
        name,
        email,
        password,
        isAdmin,
      );

      reply.status(201).send({
        message: "登録が完了しました",
        user: newUser,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }
      reply.status(500).send({
        error: "サーバーエラーが発生しました",
      });
    }
  },

  // ログイン
  async login(
    request: FastifyRequest<{ Body: LoginBody }>,
    reply: FastifyReply,
  ) {
    try {
      const { email, password } = request.body;

      const { token, user } = await authService.login(email, password);

      reply.header(
        "Set-Cookie",
        `token=${token}; HttpOnly; Secure; SameSite=Lax; Max-Age=604800; Path=/`,
      );

      reply.status(200).send({
        message: "ログインが完了しました",
        user,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }
      //throw漏れを防ぐための500エラーハンドリング
      reply.status(500).send({
        error: "サーバーエラーが発生しました",
      });
    }
  },

  // ログアウト
  async logout(_request: FastifyRequest, reply: FastifyReply) {
    try {
      reply.header(
        "Set-Cookie",
        "token=; HttpOnly; Secure; SameSite=Lax; Max-Age=0; Path=/",
      );

      reply.status(200).send({
        message: "ログアウトしました",
      });
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }
      reply.status(500).send({
        error: "サーバーエラーが発生しました",
      });
    }
  },
};
