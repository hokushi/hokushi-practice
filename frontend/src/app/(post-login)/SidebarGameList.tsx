"use client";

import { Button } from "@/components/ui/button";
import type { Game } from "./types/game";

type SidebarGameListProps = {
  games: Game[];
};

export default function SidebarGameList({ games }: SidebarGameListProps) {
  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700">ゲーム一覧</h2>
        <span className="text-xs text-slate-500">{games.length}件</span>
      </div>

      {games.length === 0 && (
        <p className="text-xs text-slate-500">ゲームがありません</p>
      )}

      {games.length > 0 && (
        <ul className="space-y-1">
          {games.map((game) => (
            <li key={game.id}>
              <Button
                type="button"
                variant="ghost"
                className="h-10 w-full justify-start rounded-md border border-slate-200 bg-white px-2.5 py-2 text-left shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="truncate text-sm font-medium text-slate-800">
                    {game.name}
                  </span>
                  <span className="shrink-0 rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-slate-600">
                    size: {game.size}
                  </span>
                </div>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
