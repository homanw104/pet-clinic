import questionDataType from "@/types/questionDataType";

type quizDataType = {
  quizId: number;
  quizName: string;
  questions: questionDataType[];
}

export default quizDataType;
