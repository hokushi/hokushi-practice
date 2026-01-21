"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type UserNameDisplayProps = {
  name: string;
};

export default function UserNameDisplay({ name }: UserNameDisplayProps) {
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
          >
            ログアウト
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
