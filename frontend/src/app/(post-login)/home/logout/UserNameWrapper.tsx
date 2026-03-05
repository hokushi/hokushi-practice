import { fetchWithAuth } from "@/app/utils/authFetch";
import UserNameDisplay from "./UserNameDisplay";

type MeResponse = {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
  };
};

export default async function UserNameWrapper() {
  const [response] = await fetchWithAuth(["/api/users/me"]);

  if (!response.ok) {
    return <div>取得失敗</div>;
  }

  const [data] = (await Promise.all([response.json()])) as [MeResponse];

  return <UserNameDisplay name={data.user.name} />;
}
