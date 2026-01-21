import { Button } from "@/components/ui/button";
import PlusIcon from "../components/icons/PlusIcon";

export default function Sidebar() {
  return (
    <aside className="flex w-[15%] min-w-[160px] flex-col border-r bg-slate-50 p-4">
      <Button type="button" variant="outline" className="w-full justify-start">
        <PlusIcon className="size-6" />
        <span>新規作成</span>
      </Button>
    </aside>
  );
}
