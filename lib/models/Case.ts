import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICase extends Document {
  name: string;
  diseases: string[];
  description: string;
}

const caseSchema = new Schema<ICase>({
  name: { type: String, required: true },
  diseases: { type: [String], required: true },
  description: { type: String, required: true },
});

const Case: Model<ICase> =
  mongoose.models.Case || mongoose.model<ICase>("Case", caseSchema);

export default Case;
