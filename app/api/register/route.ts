import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils/mongodb";
import User from "@/lib/models/User";

interface RegisterRequest {
  email: string;
  username: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const { email, username, password }: RegisterRequest = await req.json();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Double check inputs from frontend
    if (!email || !username || !password) {
      return NextResponse.json({
        success: "false", error: "Email, username and password are required"
      }, { status: 400 });
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: "false", message: "Invalid email format"
      }, { status: 400 });
    }

    if (email.length > 50) {
      return NextResponse.json({
        success: "false", message: "Email must not exceed 50 characters"
      }, { status: 400 });
    }

    if (username.length < 3) {
      return NextResponse.json({
        success: "false", message: "Username must be at least 3 characters long"
      }, { status: 400 });
    }

    if (username.length > 15) {
      return NextResponse.json({
        success: "false", message: "Username must not exceed 15 characters"
      }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({
        success: "false", message: "Password must be at least 8 characters long"
      }, { status: 400 });
    }

    if (password.length > 20) {
      return NextResponse.json({
        success: "false", message: "Password must not exceed 20 characters"
      }, { status: 400 });
    }

    // Check for existing email or username
    await connectDB();

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({
        success: "false", message: "Email already registered"
      }, { status: 400 });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return NextResponse.json({
        success: "false", message: "Username already exists"
      }, { status: 400 });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email: email, username: username, password: hashedPassword });
    return NextResponse.json({
      success: "true", message: "User registered successfully"
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: "false", message: "Internal Server Error" }, { status: 500 });
  }
}
