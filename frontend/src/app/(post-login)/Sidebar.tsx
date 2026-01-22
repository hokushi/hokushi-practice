"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/app/hooks/useToast";
import { getBaseUrl } from "@/app/utils/getBaseUrl";
import PlusIcon from "../components/icons/PlusIcon";
import { useGameCreateForm, GameCreateSchemaType } from "./gameCreate";

export default function Sidebar() {
  const toast = useToast();
  const [open, setOpen] = useState(false);

  const form = useGameCreateForm();

  const handleSubmit = async (formData: GameCreateSchemaType) => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: formData.name.trim(),
          size: Number(formData.size),
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
      };

      if (!response.ok || result.error) {
        toast.error(result.error ?? "ゲーム作成に失敗しました");
        return;
      }

      toast.success(result.message ?? "ゲームを作成しました");
      setOpen(false);
      form.reset();
    } catch {
      toast.error("ゲーム作成に失敗しました");
    }
  };

  return (
    <aside className="flex w-[15%] flex-col border-r bg-slate-50 p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className="w-full justify-start"
          >
            <PlusIcon className="size-6" />
            <span>新規作成</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新規ゲーム作成</DialogTitle>
          </DialogHeader>
          <FormProvider {...form}>
            <form
              className="grid gap-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <div className="grid gap-2">
                <Label htmlFor="game-name">ゲーム名</Label>
                <Input
                  id="game-name"
                  placeholder="例: 神経衰弱チャレンジ"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="game-size">サイズ</Label>
                <select
                  id="game-size"
                  {...form.register("size")}
                  className="border-input bg-background focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px]"
                >
                  <option value="4">4 x 4</option>
                  <option value="6">6 x 6</option>
                  <option value="8">8 x 8</option>
                </select>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="ghost">
                    キャンセル
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  作成する
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
