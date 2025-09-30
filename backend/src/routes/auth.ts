import { FastifyInstance } from "fastify";
import { PrismaClient } from "../../generated/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../schemas/user.js";
import { config } from "../config/index.js";

const prisma = new PrismaClient();

export async function authRoutes(fastify: FastifyInstance) {
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

  // ログインAPI
  fastify.post(
    "/api/login",
    { schema: loginSchema },
    async (request, reply) => {
      try {
        const { email, password } = request.body as {
          email: string;
          password: string;
        };

        // ユーザー検索
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return reply.status(401).send({
            error: "メールアドレスまたはパスワードが間違っています",
          });
        }

        // パスワード照合
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return reply.status(401).send({
            error: "メールアドレスまたはパスワードが間違っています",
          });
        }

        // JWT生成
        const payload = {
          userId: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });

        reply.status(200).send({
          message: "ログインが完了しました",
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          },
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
