import { getUsersAction } from "./_serverActions/api/getUsersAction";
import UserCard from "./_component/UserCard";

export default async function Users() {
  const usersData = await getUsersAction();

  return (
    <div className="flex h-full w-full">
      <div className="bg-pink flex w-1/2 flex-col gap-6 rounded px-2 py-4 shadow">
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
