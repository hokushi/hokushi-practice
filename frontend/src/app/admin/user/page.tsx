import { Button } from "@/components/ui/button";

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
async function getUsers(): Promise<UsersResponse> {
  const res = await fetch(`${process.env.BACKEND_URL}/api/users`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}

export default async function Users() {
  const usersData = await getUsers();

  return (
    <div className="flex h-full w-full">
      <div className="bg-pink flex w-1/2 flex-col gap-6 rounded px-2 py-4 shadow">
        <h1 className="text-center text-2xl font-semibold">ユーザー一覧</h1>
        <div className="text-center text-sm text-gray-600">
          総ユーザー数: {usersData.count}名
        </div>
        <div className="flex flex-col gap-3">
          {usersData.users.map((user) => (
            <div
              key={user.id}
              className="flex items-start justify-between rounded border bg-white p-4 shadow-sm"
            >
              <div className="flex flex-col">
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="text-xs text-gray-400">
                  登録日: {new Date(user.createdAt).toLocaleDateString("ja-JP")}
                </div>
              </div>
              <Button size="sm">編集</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
