import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils/mongoose";
import { NODE_ENV, JWT_SECRET } from "@/lib/utils/env";
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

    // Return with a JWT Cookie
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username
      },
      JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json(
      {
        success: "true",
        message: "Login successfully",
        user: {
          id: user._id,
          email: user.email,
          username: user.username
        }
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/"
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: "false", message: "Internal Server Error" }, { status: 500 });
  }
}
