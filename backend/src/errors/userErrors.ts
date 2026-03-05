import { AppError } from "./AppError.js";

export const userNotFoundError = () =>
  new AppError(
    "USER_NOT_FOUND",
    404,
    "ユーザーが見つかりません",
  );
