import { FastifyInstance } from "fastify";
import { gameController } from "../controllers/gameController.js";
import { getMyGamesSchema } from "../schemas/game.js";

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/api/games/me",
    { schema: getMyGamesSchema },
    gameController.getMyGames,
  );
}
