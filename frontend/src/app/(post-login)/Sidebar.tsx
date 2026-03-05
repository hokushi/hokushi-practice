"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/app/hooks/useToast";
import InputForm from "../components/InputForm";
import PlusIcon from "../components/icons/PlusIcon";
import { useGameCreateForm, GameCreateSchemaType } from "./gameCreate";
import { createGameAction } from "./gameCreateAction";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const toast = useToast();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useGameCreateForm();

  const handleSubmit = async (formData: GameCreateSchemaType) => {
    try {
      const res = await createGameAction({
        name: formData.name.trim(),
        size: Number(formData.size),
      });

      if (res.error) {
        toast.error(res.error);
        return;
      }

      toast.success(res.message ?? "ゲームを作成しました");
      setOpen(false);
      router.refresh();
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
              <InputForm
                control={form.control}
                name="name"
                label="ゲーム名"
                placeholder="例: 神経衰弱チャレンジ"
              />
              <div className="grid gap-2">
                <Label htmlFor="game-size">サイズ</Label>
                <select
                  id="game-size"
                  {...form.register("size")}
                  className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm shadow-xs outline-none"
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
