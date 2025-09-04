import Fastify from "fastify";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
const fastify = Fastify({ logger: true });

// 基本的なヘルスチェック
fastify.get("/", async (request, reply) => {
  return { message: "Backend server is running!" };
});

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
