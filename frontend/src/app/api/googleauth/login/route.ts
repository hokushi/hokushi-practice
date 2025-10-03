import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

const GOOGLE_SCOPES = ["openid", "email", "profile"];

export async function GET() {
  console.log("Google OAuth login initiated");
  console.log(process.env.GOOGLE_CLIENT_ID);
  console.log(process.env.GOOGLE_CLIENT_SECRET);
  console.log(process.env.GOOGLE_REDIRECT_URI);
  // OAuth2クライアントを初期化
  const client = new OAuth2Client({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  });

  // 認可URLを生成
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: GOOGLE_SCOPES,
    prompt: "consent",
  });

  return NextResponse.redirect(authUrl);
}
