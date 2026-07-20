import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { loginAction } from "@/features/auth/services/auth.service";
import { writeLog } from "@/lib/logger";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await loginAction(body.username, body.password);

    if (!result.success) {
      return NextResponse.json(result, {
        status: 401,
      });
    }

    const cookieStore = await cookies();

    cookieStore.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return NextResponse.json(result);
  } catch (error) {
    writeLog(error, "LoginRoutePost");

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        data: null,
      },
      {
        status: 500,
      },
    );
  }
}
