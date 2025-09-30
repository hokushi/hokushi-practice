"use client";

import { FormProvider, useForm } from "react-hook-form";
import InputForm from "../../components/InputForm";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordForm from "../../components/PasswordForm";
import { useRouter } from "next/navigation";

const LoginFormSchema = z.object({
  email: z
    .email({ message: "有効なメールアドレスを入力してください。" })
    .min(1, { message: "メールアドレスは必須です。" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上である必要があります。" }),
});

export default function Login() {
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
    } catch (error) {
      console.error("ネットワークエラー:", error);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="bg-pink flex w-1/3 flex-col gap-6 rounded px-2 py-4 shadow">
        <h1 className="text-center text-2xl font-semibold">ログイン</h1>
        <div>
          <FormProvider {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
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

              <button
                type="submit"
                className="bg-blue hover:bg-blue-dark rounded px-4 py-2 text-white disabled:opacity-50"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "ログイン中..." : "ログイン"}
              </button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
