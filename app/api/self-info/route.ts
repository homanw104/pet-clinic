import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { JWT_SECRET } from "@/lib/utils/env";
import User from "@/lib/models/User";

interface TokenPayload extends JwtPayload {
  id: string;
  email: string;
  username: string;
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // Check for token
    if (!token) {
      return NextResponse.json(
        { success: "false", message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Find user by id inside the verified token
    const decoded = jwt.verify(token, JWT_SECRET!) as TokenPayload;
    const user = await User.findById(decoded.id);

    // Return if user not found in database (user deleted, etc.)
    if (!user) {
      return NextResponse.json(
        { success: "false", message: "User does not exist" },
        { status: 404 }
      );
    }

    // Return user data
    return NextResponse.json(
      {
        success: "true",
        message: "Successfully parsed the token",
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: "false", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
