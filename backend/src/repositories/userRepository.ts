import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const userRepository = {
  // IDでユーザーを取得
  async findById(userId: number) {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true,
      },
    });
  },

  // メールアドレスでユーザーを取得
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        isAdmin: true,
      },
    });
  },

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

  // ユーザー作成
  async createUser(data: {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
  }) {
    return await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  },
};
