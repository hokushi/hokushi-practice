"use client";

import { getBaseUrl } from "@/app/utils/getBaseUrl";
import { Button } from "@/components/ui/button";
import { User } from "../page";

//ユーザー削除関数
async function deleteUser(id: number) {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/users/${id}`, {
    method: "DELETE",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return res.json();
}

//管理者登録関数
async function adminRegisterAction(id: number) {
  const baseUrl = getBaseUrl();
  const body = { isAdmin: true };
  const res = await fetch(`${baseUrl}/api/users/admin/${id}`, {
    method: "PUT",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  console.log(data);

  return data;
}

//ユーザーカードコンポーネント
export default function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-start justify-between rounded border bg-white p-4 shadow-sm">
      <div className="flex flex-col">
        <div className="flex">
          <div className="font-semibold">{user.name}</div>
          {user.isAdmin && (
            <div className="text-blue bg-blue-light ml-2 flex items-center justify-center rounded px-2 text-xs">
              管理者
            </div>
          )}
        </div>
        <div className="text-sm text-gray-600">{user.email}</div>
        <div className="text-xs text-gray-400">
          登録日: {new Date(user.createdAt).toLocaleDateString("ja-JP")}
        </div>
      </div>
      <div className="flex gap-2">
        {!user.isAdmin && (
          <Button
            onClick={() => {
              adminRegisterAction(user.id);
            }}
            variant="outline"
            size="sm"
          >
            管理者にする
          </Button>
        )}
        <Button
          onClick={() => {
            deleteUser(user.id);
          }}
          variant="destructive"
          size="sm"
        >
          削除
        </Button>
      </div>
    </div>
  );
}
