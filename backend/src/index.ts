import Fastify from "fastify";
import { config } from "./config/index.js";
import { userRoutes } from "./routes/users.js";

const fastify = Fastify({ logger: true });

// CORS設定
await fastify.register(import("@fastify/cors"), config.cors);

// 基本的なヘルスチェック
fastify.get("/", async () => {
  return { message: "Backend server is running!" };
});

// ルート登録
await fastify.register(userRoutes);

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
