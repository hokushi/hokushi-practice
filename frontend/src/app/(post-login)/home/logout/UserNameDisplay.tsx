"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/app/hooks/useToast";
import { getBaseUrl } from "@/app/utils/getBaseUrl";
import { useRouter } from "next/navigation";

type UserNameDisplayProps = {
  name: string;
};

export default function UserNameDisplay({ name }: UserNameDisplayProps) {
  const toast = useToast();
  const router = useRouter();

  const handleLogout = async () => {
    const baseURL = getBaseUrl();
    try {
      const response = await fetch(`${baseURL}/api/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (data.error) {
        toast.error(data.error);
        return;
      }

      toast.success(data.message ?? "ログアウトしました");
      router.push("/login");
    } catch {
      toast.error("ログアウトに失敗しました");
    }
  };

  return (
    <div className="fixed top-4 right-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="h-6 rounded-full px-3"
          >
            {name}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-36 p-1">
          <Button
            variant="ghost"
            className="h-6 w-full justify-start px-2 text-red-500 hover:text-red-600"
            onClick={handleLogout}
          >
            ログアウト
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
