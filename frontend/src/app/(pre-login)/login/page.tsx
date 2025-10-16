"use client";

import { FormProvider, useForm } from "react-hook-form";
import InputForm from "../../components/InputForm";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordForm from "../../components/PasswordForm";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/hooks/useToast";
import { Button } from "@/components/ui/button";

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
  const toast = useToast();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
      const response = await fetch("http://localhost:3002/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include", // Cookieを送受信するために必要
      });
      const result = await response.json();

      if (response.ok) {
        toast.success(result.message);
        router.push("/");
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("ネットワークエラー:", error);
      toast.error("ネットワークエラーが発生しました");
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

              <Button
                type="submit"
                className="bg-blue hover:bg-blue-dark rounded px-4 py-2 text-white disabled:opacity-50"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "ログイン中..." : "ログイン"}
              </Button>
              <a
                href="/api/googleauth/login"
                className="ml-auto text-xs text-blue-600 hover:underline cursor-pointer"
              >
                googleアカウントでログイン
              </a>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
