import { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../errors/AppError.js";
import { authTokenMissingError } from "../errors/authErrors.js";
import type { CreateGameBody } from "../schemas/game.js";
import { authService } from "../services/authService.js";
import { gameService } from "../services/gameService.js";
import { getTokenFromRequest } from "../utils/auth.js";

export const gameController = {
  async createGame(
    request: FastifyRequest<{ Body: CreateGameBody }>,
    reply: FastifyReply,
  ) {
    try {
      const token = getTokenFromRequest(request);

      if (!token) {
        throw authTokenMissingError();
      }

      const decoded = await authService.verifyToken(token);
      const { name, size } = request.body;

      const game = await gameService.createGame(decoded.userId, name, size);

      reply.status(201).send({
        message: "ゲームを作成しました",
        game: {
          ...game,
          createdAt: game.createdAt.toISOString(),
        },
      });
    } catch (error) {
      if (error instanceof AppError) {
        return reply.status(error.statusCode).send({ error: error.message });
      }
      reply.status(500).send({
        error: "サーバーエラーが発生しました",
      });
    }
  },
};
