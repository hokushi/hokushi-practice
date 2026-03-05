"use server";

import { headerBuilder } from "@/app/utils/headerBuilder";

type CreateGameInput = {
  name: string;
  size: string | number;
};

export async function createGameAction(input: CreateGameInput) {
  const { baseUrl, headers } = await headerBuilder();

  const response = await fetch(`${baseUrl}/api/games`, {
    method: "POST",
    headers,
    cache: "no-store",
    body: JSON.stringify({
      name: input.name.trim(),
      size: Number(input.size),
    }),
  });

  return (await response.json().catch(() => ({}))) as {
    message?: string;
    error?: string;
  };
}
