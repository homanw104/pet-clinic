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
    const { description, answer, optA, optB, optC, optD }: {
      description: string;
      answer: number;
      optA: string;
      optB: string;
      optC: string;
      optD: string;
    } = await req.json();

    if (!description || !answer || !optA || !optB || !optC || !optD) {
      return NextResponse.json(
        { success: "false", error: "Missing field(s)" },
        { status: 400 }
      );
    }

    await connectDB();
    await Question.create({ description, answer, optA, optB, optC, optD });

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
    const questions = docs.map((doc) => {
      return {
        id: doc._id
      };
    });
    return NextResponse.json(
      { success: "true", message: "Query success", questions: questions },
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
