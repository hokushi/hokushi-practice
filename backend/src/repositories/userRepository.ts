import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const userRepository = {
  // 全ユーザーを取得
  async findAll() {
    return await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        isAdmin: true,
      },
    });
  },
};
