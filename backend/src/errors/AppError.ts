// 汎用的なアプリケーションエラークラス

export class AppError extends Error {
  constructor(
    public readonly type: string,
    public readonly statusCode: number,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
    // TypeScriptでのError継承時に必要
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
