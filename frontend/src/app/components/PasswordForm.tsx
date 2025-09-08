"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import React from "react";
import { Control } from "react-hook-form";

type PasswordFormProps = {
  control: Control<any>;
  name: string;
  label?: string;
  inputClassName?: string;
  required?: boolean;
  helperText?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/** パスワードフォーム */
export default function PasswordForm({
  control,
  name,
  label,
  inputClassName,
  required = false,
  helperText,
  onChange,
}: PasswordFormProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <div className="flex justify-between">
            {(label || required || helperText) && (
              <FormLabel className="flex gap-2 pl-2 font-normal">
                {label}
                {required && (
                  <span className="text-xs text-red-500">※必須</span>
                )}
              </FormLabel>
            )}
            <FormMessage className="text-xs font-normal text-red-500" />
          </div>
          <div className="relative">
            <FormControl>
              <Input
                {...field}
                type="password"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e);
                }}
                className={clsx(
                  "border-s3 flex h-10 w-full rounded-md border bg-white px-2 py-2 text-sm",
                  inputClassName
                )}
              />
            </FormControl>
          </div>
        </FormItem>
      )}
    />
  );
}
