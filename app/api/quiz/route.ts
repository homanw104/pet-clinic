import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils/mongoose";
import Quiz from "@/lib/models/Quiz";

/**
 * Create a quiz.
 * @param req
 * @constructor
 */
export async function POST(req: Request) {
  try {
    const { name, questions }: {
      name: string;
      questions: string[]
    } = await req.json();

    if (!name || !questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { success: "false", error: "Missing field(s)" },
        { status: 400 }
      );
    }

    for (const questionId of questions) {
      if (!Types.ObjectId.isValid(questionId)) {
        return NextResponse.json(
          { success: "false", message: "Invalid question id" },
          { status: 401 }
        )
      }
    }

    await connectDB();
    await Quiz.create({ name, questions });

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

/**
 * Get the list of ids and names of quizzes.
 */
export async function GET() {
  try {
    await connectDB();
    const docs = await Quiz.find({}, "_id name").lean();
    const ids = docs.map((doc) => {
      return {
        id: doc._id,
        name: doc.name
      };
    });
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