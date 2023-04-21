import questionType from "@/types/question";

type quizType = {
  id: number;
  name: string;
  questions: questionType[];
}

export default quizType;
