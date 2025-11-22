import { NextResponse } from "next/server";
import { NODE_ENV } from "@/lib/utils/env";

export async function POST() {
  try {
    const response = NextResponse.json(
      { success: "true", message: "Logout successfully" },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/"
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: "false", message: "Internal Server Error" }, { status: 500 });
  }
}
