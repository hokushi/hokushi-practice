import { gameRepository } from "../repositories/gameRepository.js";

export const gameService = {
  async findByCreatorId(userId: number) {
    return await gameRepository.findByUserId(userId);
  },
};
