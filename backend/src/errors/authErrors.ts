import { AppError } from "./AppError.js";

export const invalidCredentialsError = () =>
  new AppError(
    "INVALID_CREDENTIALS",
    401,
    "メールアドレスまたはパスワードが間違っています",
  );

export const emailAlreadyExistsError = () =>
  new AppError(
    "EMAIL_ALREADY_EXISTS",
    409,
    "このメールアドレスは既に使用されています",
  );
