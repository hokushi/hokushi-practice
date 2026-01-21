import { FastifyRequest, FastifyReply } from "fastify";
import { userService } from "../services/userService.js";
import { authService } from "../services/authService.js";
import { AppError } from "../errors/AppError.js";

export const userController = {
  /**
   *　全ユーザー取得
   * @param request
   * @param reply
   * 200:全ユーザー取得成功
   * 401:認証トークンなし、無効なトークン
   * 403:管理者権限なし
   * 500:予期せぬエラー
   */
  async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      // Cookieヘッダーからtokenを取得
      const cookieHeader = request.headers.cookie;

      const token = cookieHeader?.match(/token=([^;]+)/)?.[1];

      if (!token) {
        return reply.status(401).send({
          error: "認証トークンが見つかりません",
        });
      }

      // トークン検証
      const decoded = await authService.verifyToken(token);

      // 管理者権限チェック（オプション：管理者のみアクセス可能にする場合）
      if (!decoded.isAdmin) {
        return reply.status(403).send({
          error: "管理者権限が必要です",
        });
      }

      const allUsers = await userService.findAll();

      reply.status(200).send({
        message: "全ユーザー取得成功",
        users: allUsers,
        count: allUsers.length,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }
      //throw漏れを防ぐための500エラーハンドリング
      reply.status(500).send({
        error: "サーバーエラーが発生しました",
      });
    }
  },

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
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }
      //throw漏れを防ぐための500エラーハンドリング
      reply.status(500).send({
        error: "サーバーエラーが発生しました",
      });
    }
  },
};
