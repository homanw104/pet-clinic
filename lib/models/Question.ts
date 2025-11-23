import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuestion extends Document {
  description: string;
  answer: number;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
}

const questionSchema = new Schema<IQuestion>({
  description: { type: String, required: true },
  answer: { type: Number, required: true },
  opt1: { type: String, required: true },
  opt2: { type: String, required: true },
  opt3: { type: String, required: true },
  opt4: { type: String, required: true },
});

const Question: Model<IQuestion> =
  mongoose.models.Question || mongoose.model<IQuestion>("Question", questionSchema);

export default Question;
