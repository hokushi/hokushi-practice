import { cookies } from "next/headers";
import UserNameDisplay from "./top/logout/UserNameDisplay";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3002";

type MeResponse = {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
  };
};

export default async function PostLoginPage() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    headers: {
      cookie: cookieHeader,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return <div className="p-6">ユーザー情報の取得に失敗しました</div>;
  }

  const data = (await response.json()) as MeResponse;

  return (
    <div className="p-6">
      <UserNameDisplay name={data.user.name} />
    </div>
  );
}
