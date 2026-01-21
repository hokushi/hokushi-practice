import { AppError } from "./AppError.js";

export const invalidCredentialsError = () =>
  new AppError(
    "INVALID_CREDENTIALS",
    401,
    "メールアドレスまたはパスワードが間違っています",
  );
