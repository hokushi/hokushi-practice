"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const gameCreateSchema = z.object({
  name: z.string().min(1, { message: "ゲーム名を入力してください" }),
  size: z.union([z.literal("4"), z.literal("6"), z.literal("8")]),
});

export type GameCreateSchemaType = z.infer<typeof gameCreateSchema>;

export const useGameCreateForm = () =>
  useForm<GameCreateSchemaType>({
    resolver: zodResolver(gameCreateSchema),
    defaultValues: {
      name: "",
      size: "4",
    },
  });
