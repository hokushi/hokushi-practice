"use server";

//ユーザー削除関数
export async function deleteUser(id: number) {
  const res = await fetch(`${process.env.BACKEND_URL}/api/users/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return res.json();
}
