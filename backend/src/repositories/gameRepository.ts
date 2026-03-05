import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const gameRepository = {
  async findByUserId(userId: number) {
    return await prisma.game.findMany({
      where: { userId },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
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
