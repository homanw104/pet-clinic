import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "@/lib/utils/mongoose";
import Case from "@/lib/models/Case";

/**
 * Get a case by id.
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
        { success: "false", message: "Invalid case ID" },
        { status: 401 }
      );
    }

    await connectDB();
    const theCase = await Case.findById(id)
      .populate({ path: "diseases", model: "Disease" })
      .lean();

    if (!theCase) {
      return NextResponse.json(
        { success: "false", message: "No such case" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Successfully found the case", case: theCase },
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
 * Update a case by id.
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
        { success: "false", message: "Invalid case ID" },
        { status: 401 }
      );
    }

    const { name, diseases, description }: {
      name: string;
      diseases: string[];
      description: string;
    } = await req.json();

    if (!name || !description) {
      return NextResponse.json(
        { success: "false", error: "Missing field(s)" },
        { status: 400 }
      );
    }

    if (diseases) {
      if (!Array.isArray(diseases)) {
        return NextResponse.json(
          {success: "false", message: "Diseases must be an array"},
          {status: 400}
        );
      }

      for (const diseaseId of diseases) {
        if (!Types.ObjectId.isValid(diseaseId)) {
          return NextResponse.json(
            {success: "false", message: "Invalid disease id"},
            {status: 401}
          );
        }
      }

      await connectDB();
      const theCase = await Case.findByIdAndUpdate(
        id,
        {name, diseases, description},
        {new: true}
      ).lean();

      if (!theCase) {
        return NextResponse.json(
          {success: "false", message: "No such case"},
          {status: 404}
        );
      }
    } else {
      const emptyDiseaseList: string[] = [];
      await connectDB();
      const theCase = await Case.findByIdAndUpdate(
        id,
        {name, emptyDiseaseList, description},
        {new: true}
      ).lean();

      if (!theCase) {
        return NextResponse.json(
          {success: "false", message: "No such case"},
          {status: 404}
        );
      }
    }

    return NextResponse.json(
      {success: "true", message: "Case updated"},
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

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: "false", message: "Invalid case ID" },
        { status: 401 }
      );
    }

    await connectDB();
    const theCase = await Case.findByIdAndDelete(id).lean();

    if (!theCase) {
      return NextResponse.json(
        { success: "false", message: "No such case" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: "true", message: "Case deleted" },
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
