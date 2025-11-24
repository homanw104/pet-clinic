import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuestion extends Document {
  description: string;
  answer: number;
  optA: string;
  optB: string;
  optC: string;
  optD: string;
}

const questionSchema = new Schema<IQuestion>({
  description: { type: String, required: true },
  answer: { type: Number, required: true },
  optA: { type: String, required: true },
  optB: { type: String, required: true },
  optC: { type: String, required: true },
  optD: { type: String, required: true },
});

const Question: Model<IQuestion> =
  mongoose.models.Question || mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
