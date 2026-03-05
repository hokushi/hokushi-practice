import { FastifyInstance } from "fastify";
import { createGameSchema } from "../schemas/game.js";
import { gameController } from "../controllers/gameController.js";

export async function gameRoutes(fastify: FastifyInstance) {
  // ゲーム作成API
  fastify.post(
    "/api/games",
    { schema: createGameSchema },
    gameController.createGame,
  );
}
