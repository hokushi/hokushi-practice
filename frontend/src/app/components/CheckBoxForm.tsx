"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { Control } from "react-hook-form";

type InputFormProps = {
  control: Control<any>;
  name: string;
  label?: string;
  inputClassName?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
};

/** チェックボックスフォーム */
export default function CheckBoxForm({
  control,
  name,
  label,
  required = false,
  helperText,
}: InputFormProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <div className="flex justify-between">
            {(label || required || helperText) && (
              <div className="flex justify-between gap-5">
                <FormLabel className="flex gap-2 pl-2 font-normal">
                  {label}
                  {required && <span className="text-red text-xs">※必須</span>}
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
            )}
            <FormMessage className="text-red text-xs font-normal" />
          </div>
        </FormItem>
      )}
    />
  );
}
