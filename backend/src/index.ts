import Fastify from "fastify";
import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

// CORS設定
await fastify.register(import("@fastify/cors"), {
  origin: ["http://localhost:3000", "http://localhost:3001"],
});

// リクエストボディのスキーマ定義
const registerSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { type: "string", minLength: 1 },
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 8 },
    },
  },
};

// 基本的なヘルスチェック
fastify.get("/", async (request, reply) => {
  return { message: "Backend server is running!" };
});

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
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

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

// サーバー起動
const start = async () => {
  try {
    await fastify.listen({ port: 3002, host: "0.0.0.0" });
    console.log("Server running on http://localhost:3002");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
