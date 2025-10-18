import { PrismaClient } from "../../generated/prisma/index.js";
import { userRepository } from "../repositories/userRepository.js";

const prisma = new PrismaClient();

export const userService = {
  // ユーザーをIDで検索
  async findById(userId: number) {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  },

  // 全ユーザーを取得
  async findAll() {
    return await userRepository.findAll();
  },

  // ユーザーの管理者権限を更新
  async updateAdminStatus(userId: number, isAdmin: boolean) {
    return await prisma.user.update({
      where: { id: userId },
      data: { isAdmin },
    });
  },

  // ユーザーを削除
  async deleteUser(userId: number) {
    return await prisma.user.delete({
      where: { id: userId },
    });
  },
};
