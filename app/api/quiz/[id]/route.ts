import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "@/lib/utils/mongoose";
import Question from "@/lib/models/Question";

/**
 * Get a question by id.
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
        { success: "false", message: "Invalid question ID" },
        { status: 401 }
      )
    }

    await connectDB();
    const question = await Question.findById(id).lean();

    if (!question) {
      return NextResponse.json(
        { success: "false", message: "No such question" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Successfully found the question", question: question },
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
 * Update a question by id.
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
        { success: "false", message: "Invalid question ID" },
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
    const question = await Question.findByIdAndUpdate(
      id,
      { description, answer, opt1, opt2, opt3, opt4 }
    ).lean();

    if (!question) {
      return NextResponse.json(
        { success: "false", message: "No such question" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Successfully updated the question" },
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
 * Delete a question by id.
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
        { success: "false", message: "Invalid question ID" },
        { status: 401 }
      )
    }

    await connectDB();
    const question = await Question.findByIdAndDelete(id).lean();

    if (!question) {
      return NextResponse.json(
        { success: "false", message: "No such question" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Successfully deleted the question" },
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
