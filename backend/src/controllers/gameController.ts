import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../errors/AppError.js";
import { authTokenMissingError } from "../errors/authErrors.js";
import { authService } from "../services/authService.js";
import { gameService } from "../services/gameService.js";
import { getTokenFromRequest } from "../utils/auth.js";

export const gameController = {
  async getMyGames(request: FastifyRequest, reply: FastifyReply) {
    try {
      const token = getTokenFromRequest(request);

      if (!token) {
        throw authTokenMissingError();
      }

      const decoded = await authService.verifyToken(token);
      const games = await gameService.findByCreatorId(decoded.userId);
      // DateオブジェクトをISO文字列に変換してシリアライズする
      const serializedGames = games.map((game) => ({
        ...game,
        createdAt: game.createdAt.toISOString(),
      }));

      reply.status(200).send({
        message: "ユーザー作成ゲーム取得成功",
        games: serializedGames,
        count: serializedGames.length,
      });
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }

      request.log.error(error);
      reply.status(500).send({
        error: "サーバーエラーが発生しました",
      });
    }
  },
};
