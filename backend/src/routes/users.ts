import { FastifyInstance } from "fastify";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function userRoutes(fastify: FastifyInstance) {
  // 全ユーザー取得API
  fastify.get("/api/users", async () => {
    try {
      const allUsers = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      return {
        message: "全ユーザー取得成功",
        users: allUsers,
        count: allUsers.length
      };
    } catch (error) {
      fastify.log.error(error);
      return {
        error: "ユーザー取得エラーが発生しました",
      };
    }
  });
}