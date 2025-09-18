import { FastifyInstance } from "fastify";
import { PrismaClient } from "../../generated/prisma/index.js";
import bcrypt from "bcrypt";
import { registerSchema } from "../schemas/user.js";
import { config } from "../config/index.js";

const prisma = new PrismaClient();

export async function userRoutes(fastify: FastifyInstance) {
  // ユーザー登録API
  fastify.post(
    "/api/users/register",
    { schema: registerSchema },
    async (request, reply) => {
      try {
        const { name, email, password } = request.body as {
          name: string;
          email: string;
          password: string;
        };

        // 既存ユーザーチェック
        const existingUser = await prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          return reply.status(409).send({
            error: "このメールアドレスは既に使用されています",
          });
        }

        // パスワードハッシュ化
        const hashedPassword = await bcrypt.hash(password, config.saltRounds);

        // ユーザー作成
        const newUser = await prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
          },
        });

        reply.status(201).send({
          message: "登録が完了しました",
          user: newUser,
        });
      } catch (error) {
        fastify.log.error(error);
        reply.status(500).send({
          error: "サーバーエラーが発生しました",
        });
      }
    }
  );
}