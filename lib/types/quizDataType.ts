import questionDataType from "@/lib/types/questionDataType";

type quizDataType = {
  quizId: string;
  quizName: string;
  questions: questionDataType[];
}

export default quizDataType;
