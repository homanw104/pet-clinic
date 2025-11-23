import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils/mongoose";
import Question from "@/lib/models/Question";

/**
 * Create a question.
 * @param req
 * @constructor
 */
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
    await Question.create({ description, answer, opt1, opt2, opt3, opt4 });

    return NextResponse.json(
      { success: "true", message: "Question created" },
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

/**
 * Get the list of ids of questions.
 * @constructor
 */
export async function GET() {
  try {
    await connectDB();
    const docs = await Question.find({}, "_id").lean();
    const ids = docs.map((doc) => doc._id);
    return NextResponse.json(
      { success: "true", message: "Query success", question_ids: ids },
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
