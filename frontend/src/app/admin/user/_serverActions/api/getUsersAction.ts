"use server";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface UsersResponse {
  message: string;
  users: User[];
  count: number;
}

//ユーザー取得関数
export async function getUsersAction(): Promise<UsersResponse> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/users`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
