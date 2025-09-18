export function getBaseUrl(): string {
  return process.env.BACKEND_URL || "http://localhost:3002";
}
