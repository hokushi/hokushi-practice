import { FastifyRequest, FastifyReply } from "fastify";
import { authService } from "../services/authService.js";

export const authController = {
  // ユーザー登録
  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { name, email, password, isAdmin } = request.body as {
        name: string;
        email: string;
        password: string;
        isAdmin: boolean;
      };

      const newUser = await authService.register(
        name,
        email,
        password,
        isAdmin
      );

      reply.status(201).send({
        message: "登録が完了しました",
        user: newUser,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "このメールアドレスは既に使用されています") {
          return reply.status(409).send({ error: error.message });
        }
      }
      reply.status(500).send({
        error: "サーバーエラーが発生しました",
      });
    }
  },

  // ログイン
  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as {
        email: string;
        password: string;
      };

      const { token, user } = await authService.login(email, password);

      // Cookieにトークンを設定
      reply.header(
        "Set-Cookie",
        `token=${token}; HttpOnly; SameSite=Lax; Max-Age=604800; Path=/`
      );

      reply.status(200).send({
        message: "ログインが完了しました",
        user,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (
          error.message === "メールアドレスまたはパスワードが間違っています"
        ) {
          return reply.status(401).send({ error: error.message });
        }
        if (error.message === "このメールアドレスは既に使用されています") {
          return reply.status(409).send({ error: error.message });
        }
      }
      reply.status(500).send({
        error: "サーバーエラーが発生しました",
      });
    }
  },
};
