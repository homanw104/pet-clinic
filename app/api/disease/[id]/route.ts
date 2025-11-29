import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "@/lib/utils/mongoose";
import Disease from "@/lib/models/Disease";

/**
 * Get a disease by id.
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
        { success: "false", message: "Invalid disease ID" },
        { status: 401 }
      );
    }

    await connectDB();
    const disease = await Disease.findById(id).lean();

    if (!disease) {
      return NextResponse.json(
        { success: "false", message: "No such disease" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Successfully found the disease", disease: disease },
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
 * Update a disease by id.
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
        { success: "false", message: "Invalid disease ID" },
        { status: 401 }
      );
    }

    const { name, category, description }: {
      name: string;
      category: string;
      description: string;
    } = await req.json();

    if (!name || !category || !description) {
      return NextResponse.json(
        { success: "false", error: "Missing field(s)" },
        { status: 400 }
      );
    }

    await connectDB();
    const disease = await Disease.findByIdAndUpdate(
      id,
      { name, category, description },
      { new: true }
    ).lean();

    if (!disease) {
      return NextResponse.json(
        { success: "false", message: "No such disease" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Disease updated" },
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
 * Delete a disease by id.
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
        { success: "false", message: "Invalid disease ID" },
        { status: 401 }
      );
    }

    await connectDB();
    const disease = await Disease.findByIdAndDelete(id).lean();

    if (!disease) {
      return NextResponse.json(
        { success: "false", message: "No such disease" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Disease deleted" },
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
