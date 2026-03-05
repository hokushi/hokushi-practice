import { Button } from "@/components/ui/button";
import { fetchWithAuth } from "@/app/utils/authFetch";
import PlusIcon from "../components/icons/PlusIcon";
import SidebarGameList from "./SidebarGameList";
import type { Game } from "./types/game";

type GamesResponse = {
  message: string;
  games: Game[];
  count: number;
};

export default async function Sidebar() {
  const [response] = await fetchWithAuth(["/api/games/me"]);
  const [data] = (await Promise.all([response.json()])) as [GamesResponse];

  return (
    <aside className="flex w-[20%] flex-col gap-4 border-r bg-slate-50 p-4">
      <Button
        type="button"
        className="h-10 w-full justify-start gap-2 rounded-md bg-slate-500 px-3 text-white shadow-sm hover:bg-slate-800"
      >
        <span className="rounded bg-white/20 p-1">
          <PlusIcon className="size-4" />
        </span>
        <span className="text-sm font-medium">新規作成</span>
      </Button>
      <SidebarGameList games={data.games} />
    </aside>
  );
}
