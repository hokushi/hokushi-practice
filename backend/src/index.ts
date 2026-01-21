import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { config } from "./config/index.js";
import { authRoutes } from "./routes/auth.js";
import { userRoutes } from "./routes/users.js";

const fastify = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);

// CORS設定
await fastify.register(import("@fastify/cors"), config.cors);

// ヘルスチェック
fastify.get("/", async () => {
  return { message: "Backend server is running!" };
});

// ルート登録
await fastify.register(authRoutes); // 認証系API
await fastify.register(userRoutes); // ユーザー管理系API

// サーバー起動
const start = async () => {
  try {
    await fastify.listen({ port: config.port, host: config.host });
    console.log(`Server running on http://${config.host}:${config.port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
