"use server";

import { cookies } from "next/headers";
import { getBaseUrl } from "./getBaseUrl";

/** 共通のヘッダーとベースURLを返すユーティリティ */
export async function headerBuilder() {
  const baseUrl = getBaseUrl();

  // Cookie をすべて取得
  const cookieStore = await cookies();
  const cookieList = cookieStore.getAll();

  // Cookie をヘッダー形式に変換
  const cookieHeader = cookieList.map((c) => `${c.name}=${c.value}`).join("; ");

  // ヘッダーを構築（formdataがfalseのときだけ Content-Type を追加）
  const headers = {
    Cookie: cookieHeader,
    "Content-Type": "application/json",
  };

  return { baseUrl, headers };
}
