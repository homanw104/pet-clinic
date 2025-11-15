import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils/mongoose";
import User from "@/lib/models/User";

interface LoginRequest {
  identifier: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    // identifier: username or email
    const { identifier, password }: LoginRequest = await req.json();

    // Double check inputs from frontend
    if (!identifier || !password) {
      return NextResponse.json(
        { success: "false", error: "Identifier and password are required" },
        { status: 400 }
      );
    }

    // Check for existing email and username pair
    await connectDB();

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return NextResponse.json(
        { success: "false", message: "Username or email does not exist" },
        { status: 404 }
      );
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: "false", message: "Password does not match" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Login successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: "false", message: "Internal Server Error" }, { status: 500 });
  }
}
