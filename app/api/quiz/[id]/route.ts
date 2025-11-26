import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "@/lib/utils/mongoose";
import Question from "@/lib/models/Question";
import Quiz from "@/lib/models/Quiz";

/**
 * Get a quiz by id.
 * @param req
 * @param params
 * @constructor
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: "false", message: "Invalid quiz ID" },
        { status: 401 }
      );
    }

    await connectDB();
    const quiz = await Quiz.findById(id)
      .populate({ path: "questions", model: Question })
      .lean();

    if (!quiz) {
      return NextResponse.json(
        { success: "false", message: "No such quiz" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Successfully found the quiz", quiz: quiz },
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

/**
 * Update a quiz by id.
 * @param req
 * @param params
 * @constructor
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const {id} = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {success: "false", message: "Invalid quiz ID"},
        {status: 401}
      );
    }

    const {name, questions}: {
      name: string;
      questions: string[]
    } = await req.json();

    if (!name || !questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        {success: "false", error: "Missing field(s)"},
        {status: 400}
      );
    }

    for (const questionId of questions) {
      if (!Types.ObjectId.isValid(questionId)) {
        return NextResponse.json(
          { success: "false", message: "Invalid question id" },
          { status: 401 }
        );
      }
    }

    await connectDB();
    const quiz = await Quiz.findByIdAndUpdate(
      id,
      {name, questions}
    ).lean();

    if (!quiz) {
      return NextResponse.json(
        {success: "false", message: "No such quiz"},
        {status: 404}
      );
    }

    return NextResponse.json(
      {success: "true", message: "Quiz updated"},
      {status: 200}
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {success: "false", message: "Internal Server Error"},
      {status: 500}
    );
  }
}

/**
 * Delete a quiz by id.
 * @param req
 * @param params
 * @constructor
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: "false", message: "Invalid quiz ID" },
        { status: 401 }
      );
    }

    await connectDB();
    const quiz = await Quiz.findByIdAndDelete(id).lean();

    if (!quiz) {
      return NextResponse.json(
        { success: "false", message: "No such quiz" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Quiz deleted" },
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
