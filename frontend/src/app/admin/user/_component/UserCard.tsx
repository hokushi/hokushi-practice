"use client";

import { getBaseUrl } from "@/app/utils/getBaseUrl";
import { Button } from "@/components/ui/button";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

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

//ユーザーカードコンポーネント
export default function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-start justify-between rounded border bg-white p-4 shadow-sm">
      <div className="flex flex-col">
        <div className="font-semibold">{user.name}</div>
        <div className="text-sm text-gray-600">{user.email}</div>
        <div className="text-xs text-gray-400">
          登録日: {new Date(user.createdAt).toLocaleDateString("ja-JP")}
        </div>
      </div>
      <Button
        className="hover:cursor-pointer"
        onClick={() => {
          deleteUser(user.id);
        }}
        variant="destructive"
        size="sm"
      >
        削除
      </Button>
    </div>
  );
}
