import PageContent from "@/app/(quiz)/quiz/[id]/page-content";

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
