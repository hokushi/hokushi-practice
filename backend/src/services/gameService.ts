import { gameRepository } from "../repositories/gameRepository.js";

export const gameService = {
  async createGame(userId: number, name: string, size: number) {
    return await gameRepository.createGame({ userId, name, size });
  },
};
