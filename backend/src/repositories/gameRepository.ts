import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const gameRepository = {
  // ゲーム作成
  async createGame(data: { userId: number; name: string; size: number }) {
    return await prisma.game.create({
      data,
      select: {
        id: true,
        userId: true,
        name: true,
        size: true,
        createdAt: true,
      },
    });
  },
};
