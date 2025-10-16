import { FastifyRequest, FastifyReply } from "fastify";
import { userService } from "../services/userService.js";

export const userController = {
  // 管理者登録
  async amdinRegister(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const { isAdmin } = request.body as { isAdmin: boolean };
      const userId = parseInt(id);

      if (isNaN(userId) || !userId) {
        return reply.status(400).send({
          error: "無効なユーザーIDです",
        });
      }

      if (typeof isAdmin !== "boolean") {
        return reply.status(400).send({
          error: "body内容が正しくありません",
        });
      }

      // ユーザーの存在確認
      const existingUser = await userService.findById(userId);

      if (!existingUser) {
        return reply.status(400).send({
          error: "指定されたユーザーが見つかりません",
        });
      }

      // ユーザーの管理者権限を更新
      const updatedUser = await userService.updateAdminStatus(userId, isAdmin);

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
      console.log(error);
      reply.status(500).send({
        error: " 想定外のエラーが発生しました",
      });
    }
  },
};
