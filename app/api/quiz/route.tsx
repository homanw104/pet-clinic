import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils/mongoose";
import Quiz from "@/lib/models/Quiz";

export async function POST(req: Request) {
  try {
    const { description, answer, opt1, opt2, opt3, opt4 }: {
      description: string;
      answer: number;
      opt1: string;
      opt2: string;
      opt3: string;
      opt4: string;
    } = await req.json();

    if (!description || !answer || !opt1 || !opt2 || !opt3 || !opt4) {
      return NextResponse.json(
        { success: "false", error: "Missing field(s)" },
        { status: 400 }
      );
    }

    await connectDB();
    await Quiz.create({ description, answer, opt1, opt2, opt3, opt4 });

    return NextResponse.json(
      { success: "true", message: "Quiz created" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: "false", message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const docs = await Quiz.find({}, "_id").lean();
    const ids = docs.map((doc) => doc._id);
    return NextResponse.json(
      { success: "true", message: "Query success", quiz_ids: ids },
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
