import type { FastifyRequest } from "fastify";

export const getTokenFromRequest = (request: FastifyRequest) =>
  request.headers.cookie?.match(/token=([^;]+)/)?.[1];
