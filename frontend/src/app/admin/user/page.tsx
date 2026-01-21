import UserCard from "./_component/UserCard";
import { headerBuilder } from "@/app/utils/headerBuilder";

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  isAdmin: boolean;
}

interface UsersSuccessResponse {
  message: string;
  users: User[];
  count: number;
}

interface UsersErrorResponse {
  error: string;
}

type UsersResponse = UsersSuccessResponse | UsersErrorResponse;

export default async function Users() {
  const usersData = await getUsers();

  console.log("ユーザーデータ:");
  console.log(usersData);

  //ユーザー取得関数
  async function getUsers(): Promise<UsersResponse> {
    try {
      const { baseUrl, headers } = await headerBuilder();

      const res = await fetch(`${baseUrl}/api/users`, {
        method: "GET",
        cache: "no-store",
        headers,
      });

      if (!res.ok) {
        const errorData = await res.json();
        return { error: errorData.error || "ユーザーの取得に失敗しました" };
      }

      return res.json();
    } catch (error) {
      return { error: "サーバーとの通信に失敗しました" };
    }
  }

  // エラーチェック
  if ("error" in usersData) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-1/3 flex-col gap-6 rounded bg-white px-6 py-8 shadow">
          <h1 className="text-center text-2xl font-semibold">ユーザー一覧</h1>
          <div className="text-center text-sm text-red-600">
            {usersData.error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full">
      <div className="flex w-1/2 flex-col gap-6 rounded bg-white px-2 py-4 shadow">
        <h1 className="text-center text-2xl font-semibold">ユーザー一覧</h1>
        <div className="text-center text-sm text-gray-600">
          総ユーザー数: {usersData.count}名
        </div>
        <div className="flex flex-col gap-3">
          {usersData.users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
