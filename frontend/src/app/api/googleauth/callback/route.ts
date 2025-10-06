import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  redirectUri: process.env.GOOGLE_REDIRECT_URI!,
});

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "Authorization code not found" },
      { status: 400 }
    );
  }

  try {
    // 1. 認可コードを使ってトークンを取得
    const { tokens } = await client.getToken(code);

    // 2. IDトークンを検証してユーザー情報を取り出す
    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token!,
      audience: process.env.GOOGLE_CLIENT_ID!,
    });
    const payload = ticket.getPayload();

    // 3. ユーザー情報を返す（本当はここでDBに保存 or セッション発行する）
    return NextResponse.json({
      tokens,
      user: {
        id: payload?.sub,
        email: payload?.email,
        emailVerified: payload?.email_verified,
        name: payload?.name,
        picture: payload?.picture,
      },
    });
  } catch (err) {
    console.error("Error during OAuth callback:", err);
    return NextResponse.json(
      { error: "OAuth callback failed" },
      { status: 500 }
    );
  }
}
