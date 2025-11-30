import questionDataType from "@/lib/types/QuestionDataType";

type quizDataType = {
  quizId: string;
  quizName: string;
  questions: questionDataType[];
}

export default quizDataType;
