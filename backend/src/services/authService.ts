import { PrismaClient } from "../../generated/prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";

const prisma = new PrismaClient();

export const authService = {
  // ユーザー登録
  async register(
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
  ) {
    // 既存ユーザーチェック
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("このメールアドレスは既に使用されています");
    }

    // パスワードハッシュ化
    const hashedPassword = await bcrypt.hash(password, config.saltRounds);

    // ユーザー作成
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return newUser;
  },

  // ログイン
  async login(email: string, password: string) {
    // ユーザー検索
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("メールアドレスまたはパスワードが間違っています");
    }

    // パスワード照合
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("メールアドレスまたはパスワードが間違っています");
    }

    // JWT生成
    const payload = {
      userId: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: "7d" });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    };
  },
};
