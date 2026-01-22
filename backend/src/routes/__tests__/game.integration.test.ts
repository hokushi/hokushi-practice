import { afterAll, describe, expect, it } from "vitest";
import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../../../generated/prisma/index.js";
import { config } from "../../config/index.js";
import { gameRoutes } from "../game.js";

const prisma = new PrismaClient();

const buildApp = async () => {
  const app = Fastify({ logger: false }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);
  await app.register(gameRoutes);

  return app;
};

afterAll(async () => {
  await prisma.$disconnect();
});

describe("POST /api/games (integration)", () => {
  it("creates a game in the database and returns serialized createdAt", async () => {
    const app = await buildApp();
    const email = `test+${Date.now()}@example.com`;

    const user = await prisma.user.create({
      data: {
        name: "test-user",
        email,
        password: "hashed-password",
        isAdmin: false,
      },
      select: {
        id: true,
      },
    });

    const token = jwt.sign(
      { userId: user.id, email, isAdmin: false },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    const response = await app.inject({
      method: "POST",
      url: "/api/games",
      headers: {
        cookie: `token=${token}`,
      },
      payload: {
        name: "demo",
        size: 6,
      },
    });

    expect(response.statusCode).toBe(201);
    const body = response.json() as {
      message: string;
      game: {
        id: number;
        userId: number;
        name: string;
        size: number;
        createdAt: string;
      };
    };
    expect(body.message).toBe("ゲームを作成しました");
    expect(body.game.userId).toBe(user.id);
    expect(body.game.name).toBe("demo");
    expect(body.game.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);

    const dbGame = await prisma.game.findUnique({
      where: { id: body.game.id },
      select: { id: true, userId: true, name: true, size: true },
    });
    expect(dbGame).toEqual({
      id: body.game.id,
      userId: user.id,
      name: "demo",
      size: 6,
    });

    await prisma.game.deleteMany({ where: { userId: user.id } });
    await prisma.user.delete({ where: { id: user.id } });
    await app.close();
  });
});
