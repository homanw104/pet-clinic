import axios from "@/lib/utils/axios";
import { Metadata } from "next";
import PageContent from "@/app/(quiz)/quiz/[id]/page-content";

export async function generateMetadata({ params }: {
  params: Promise<{
    id: string;
  }>;
}): Promise<Metadata> {
  const paramsData = await params;
  const id = paramsData.id;
  const response = await axios.get(`/quiz/${id}`);
  const title = response.data.quiz.name + " | Pet Clinic";

  return {
    title: title,
    description: "Pet Clinic online learning platform."
  };
}

export default async function Page({ params }: {
  params: Promise<{
    id: string;
  }>
}) {
  const { id } = await params;

  return (
    <PageContent quizId={id} />
  );
}
