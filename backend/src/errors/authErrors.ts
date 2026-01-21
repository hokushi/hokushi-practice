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

export const authTokenMissingError = () =>
  new AppError(
    "AUTH_TOKEN_MISSING",
    401,
    "ログインし直してください",
  );

export const invalidTokenError = () =>
  new AppError(
    "INVALID_TOKEN",
    401,
    "無効なトークンです",
  );
