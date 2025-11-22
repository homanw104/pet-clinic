import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuiz extends Document {
  description: string;
  answer: number;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
}

const quizSchema = new Schema<IQuiz>({
  description: { type: String, required: true },
  answer: { type: Number, required: true },
  opt1: { type: String, required: true },
  opt2: { type: String, required: true },
  opt3: { type: String, required: true },
  opt4: { type: String, required: true },
});

const Quiz: Model<IQuiz> =
  mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", quizSchema);

export default Quiz;
