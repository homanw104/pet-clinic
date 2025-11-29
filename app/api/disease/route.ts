import { NextResponse } from "next/server";
import { connectDB } from "@/lib/utils/mongoose";
import Disease from "@/lib/models/Disease";

/**
 * Create a disease.
 * @param req
 * @constructor
 */
export async function POST(req: Request) {
  try {
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
    await Disease.create({ name, category, description });

    return NextResponse.json(
      { success: "true", message: "Disease created" },
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
 * Get the list of ids, names, and categories of diseases.
 * @constructor
 */
export async function GET() {
  try {
    await connectDB();
    const docs = await Disease.find({}, "_id name category").lean();
    const diseases = docs.map((doc) => {
      return {
        id: doc._id,
        name: doc.name,
        category: doc.category,
      };
    });

    return NextResponse.json(
      { success: "true", message: "Query success", diseases: diseases },
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
