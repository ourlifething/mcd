import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    let role: string | null = null;

    if (password && process.env.POST_PASSWORD && password === process.env.POST_PASSWORD) {
      role = 'admin';
    } else if (password && process.env.GRAPHIC_GUEST_PASSWORD && password === process.env.GRAPHIC_GUEST_PASSWORD) {
      role = 'guest';
    }

    if (!role) {
      return NextResponse.json({ error: "パスワードが正しくありません" }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, role });
    
    // HttpOnly Cookie の設定
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7日間
    };

    response.cookies.set({
      name: 'graphic_auth',
      value: 'true',
      ...cookieOptions,
    });

    response.cookies.set({
      name: 'graphic_role',
      value: role,
      ...cookieOptions,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}