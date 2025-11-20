/**
 * Exports a connectDB function to connect to a mongodb instance when needed.
 */

import mongoose from "mongoose";
import { NODE_ENV, MONGODB_URI } from "@/lib/utils/env";

/**
 * Prevent multiple connections in dev (Hot Reloading)
 */
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  let dbName: string;

  if (NODE_ENV === "production") {
    dbName = "prod";
  } else if (NODE_ENV === "development") {
    dbName = "dev";
  } else {
    dbName = "test";
  }

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const connectStr = MONGODB_URI + dbName;
    cached.promise = mongoose.connect(connectStr);
  }

  cached.conn = await cached.promise;
}
