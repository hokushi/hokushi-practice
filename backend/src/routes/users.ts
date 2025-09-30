import { FastifyInstance } from "fastify";
import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function userRoutes(fastify: FastifyInstance) {
  // 全ユーザー取得API
  fastify.get("/api/users", async (_, reply) => {
    try {
      const allUsers = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          isAdmin: true,
        },
      });

      reply.status(200).send({
        message: "全ユーザー取得成功",
        users: allUsers,
        count: allUsers.length,
      });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({
        error: "ユーザー取得エラーが発生しました",
      });
    }
  });

  // ユーザー削除API
  fastify.delete("/api/users/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const userId = parseInt(id);

      if (isNaN(userId)) {
        return reply.status(400).send({
          error: "無効なユーザーIDです",
        });
      }

      // ユーザーの存在確認
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return reply.status(400).send({
          error: "指定されたユーザーが見つかりません",
        });
      }

      // ユーザー削除
      await prisma.user.delete({
        where: { id: userId },
      });

      reply.status(200).send({
        message: "ユーザーが正常に削除されました",
        deletedUserId: userId,
      });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({
        error: "サーバーエラーが発生しました",
      });
    }
  });

  // ユーザー管理者登録API
  fastify.put("/api/users/admin/:id", async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const { isAdmin } = request.body as { isAdmin: boolean };
      const userId = parseInt(id);

      if (isNaN(userId)) {
        return reply.status(400).send({
          error: "無効なユーザーIDです",
        });
      }

      if (typeof isAdmin !== "boolean") {
        return reply.status(400).send({
          error: "isAdminはboolean型である必要があります",
        });
      }

      // ユーザーの存在確認
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!existingUser) {
        return reply.status(400).send({
          error: "指定されたユーザーが見つかりません",
        });
      }

      // ユーザーの管理者権限を更新
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { isAdmin },
      });

      reply.status(200).send({
        message: "ユーザーの管理者権限が正常に更新されました",
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          isAdmin: updatedUser.isAdmin,
        },
      });
    } catch (error) {
      fastify.log.error(error);
      reply.status(500).send({
        error: "サーバーエラーが発生しました",
      });
    }
  });
}
