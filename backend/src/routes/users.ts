import { FastifyInstance } from "fastify";
import { userController } from "../controllers/userController.js";
import { adminRegisterSchema, getAllUserSchema } from "../schemas/user.js";
import { userService } from "../services/userService.js";

export async function userRoutes(fastify: FastifyInstance) {
  // 全ユーザー取得API
  fastify.get(
    "/api/users",
    { schema: getAllUserSchema },
    userController.getAllUsers
  );

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
      const existingUser = await userService.findById(userId);

      if (!existingUser) {
        return reply.status(400).send({
          error: "指定されたユーザーが見つかりません",
        });
      }

      // ユーザー削除
      await userService.deleteUser(userId);

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
  fastify.put(
    "/api/users/admin/:id",
    { schema: adminRegisterSchema },
    userController.amdinRegister
  );
}
