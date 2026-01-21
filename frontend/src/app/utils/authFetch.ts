"use server";

import { redirect } from "next/navigation";
import { headerBuilder } from "./headerBuilder";

export async function fetchWithAuth(paths: string[]) {
  const { baseUrl, headers } = await headerBuilder();

  const responses = await Promise.all(
    paths.map((path) =>
      fetch(`${baseUrl}${path}`, {
        headers,
        cache: "no-store",
      })
    )
  );

  if (responses.some((response) => response.status === 401)) {
    redirect("/login");
  }

  return responses;
}
