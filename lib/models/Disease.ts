import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDisease extends Document {
  name: string;
  category: string;
  description: string;
}

const diseaseSchema = new Schema<IDisease>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
});

const Disease: Model<IDisease> =
  mongoose.models.Disease || mongoose.model<IDisease>("Disease", diseaseSchema);

export default Disease;
