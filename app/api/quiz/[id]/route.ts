import { connectDB } from "@/lib/utils/mongoose";
import { NextResponse } from "next/server";
import Quiz from "@/lib/models/Quiz";
import { Types } from "mongoose";

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
        { success: "false", message: "Invalid ID" },
        { status: 401 }
      )
    }

    await connectDB();
    const quiz = await Quiz.findById(id).lean();

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
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: "false", message: "Invalid ID" },
        { status: 401 }
      )
    }

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
    const quiz = await Quiz.findByIdAndUpdate(
      id,
      { description, answer, opt1, opt2, opt3, opt4 }
    ).lean();

    if (!quiz) {
      return NextResponse.json(
        { success: "false", message: "No such quiz" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Successfully updated the quiz" },
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
        { success: "false", message: "Invalid ID" },
        { status: 401 }
      )
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
      { success: "true", message: "Successfully deleted" },
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
