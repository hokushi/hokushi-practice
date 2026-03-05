"use server";

import { cookies } from "next/headers";
import { headerBuilder } from "@/app/utils/headerBuilder";

export async function logout() {
  const { baseUrl } = await headerBuilder();

  // Cookie をすべて取得
  const cookieStore = await cookies();
  const cookieList = cookieStore.getAll();

  // Cookie をヘッダー形式に変換
  const cookieHeader = cookieList.map((c) => `${c.name}=${c.value}`).join("; ");

  const response = await fetch(`${baseUrl}/api/logout`, {
    method: "POST",
    headers: {
      Cookie: cookieHeader,
    },
    cache: "no-store",
  });

  return response.json() as Promise<{ message?: string; error?: string }>;
}
