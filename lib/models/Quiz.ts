import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuiz extends Document {
  name: string;
  questions: string[];
}

const quizSchema = new Schema<IQuiz>({
  name: { type: String, required: true },
  questions: { type: [String], required: true },
});

const Quiz: Model<IQuiz> =
  mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", quizSchema);

export default Quiz;
