import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "@/lib/utils/mongoose";
import Case from "@/lib/models/Case";

/**
 * Create a case.
 * @param req
 * @constructor
 */
export async function POST(req: Request) {
  try {
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
          { success: "false", message: "Diseases must be an array" },
          { status: 400 }
        );
      }

      for (const diseaseId of diseases) {
        if (!Types.ObjectId.isValid(diseaseId)) {
          return NextResponse.json(
            { success: "false", message: "Invalid disease id" },
            { status: 401 }
          );
        }
      }

      await connectDB();
      await Case.create({ name, diseases, description });
    } else {
      const emptyDiseaseList: string[] = [];
      await connectDB();
      await Case.create({ name, diseases: emptyDiseaseList, description });
    }

    return NextResponse.json(
      { success: "true", message: "Case created" },
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
 * Get the list of ids and names of cases.
 * @constructor
 */
export async function GET() {
  try {
    await connectDB();
    const docs = await Case.find({}, "_id name").lean();
    const cases = docs.map((doc) => {
      return {
        id: doc._id,
        name: doc.name
      };
    });
    return NextResponse.json(
      { success: "true", message: "Query success" ,cases: cases },
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
