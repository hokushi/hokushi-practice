"use client";

import { FormProvider, useForm } from "react-hook-form";
import InputForm from "../components/InputForm";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordForm from "../components/PasswordForm";

const AccountFormSchema = z.object({
  name: z.string().min(1, { message: "名前は必須です。" }),
  email: z
    .email({ message: "有効なメールアドレスを入力してください。" })
    .min(1, { message: "メールアドレスは必須です。" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上である必要があります。" }),
  password_check: z
    .string()
    .min(8, { message: "パスワード確認は8文字以上である必要があります。" }),
});

export default function Register() {
  const form = useForm<z.infer<typeof AccountFormSchema>>({
    resolver: zodResolver(AccountFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_check: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof AccountFormSchema>) => {
    console.log(data);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-1/2 w-1/3 flex-col gap-6 rounded bg-red-100 p-2 shadow">
        <h1 className="text-center text-2xl font-semibold">アカウント作成</h1>
        <div>
          <FormProvider {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <InputForm
                control={form.control}
                name="name"
                label="名前"
                required
                placeholder="坂本 太郎"
              />
              <InputForm
                control={form.control}
                name="email"
                label="メールアドレス"
                required
                placeholder="hogehoge@gmail.com"
              />
              <PasswordForm
                control={form.control}
                name="password"
                label="パスワード"
                required
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
