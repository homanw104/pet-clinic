import { Metadata } from "next";
import { getArticleBySlug, getArticleSlugs } from "@/lib/utils/article";
import PageContent from "@/app/(intro)/tour/[roomName]/[articleSlug]/page-content";
import rooms from "@/lib/contents/rooms";

export async function generateStaticParams() {
  let paramsList: { roomName: string; articleSlug: string }[] = [];

  for (const roomBrief of rooms) {
    const articleSlugs = await getArticleSlugs(roomBrief.englishID);
    paramsList.push(
      ...articleSlugs.map((slug) => ({
        roomName: roomBrief.englishID,
        articleSlug: slug,
      }))
    )
  }

  return paramsList;
}

export async function generateMetadata({ params }: {
  params: Promise<{
    roomName: string;
    articleSlug: string;
  }>;
}): Promise<Metadata> {
  const paramsData = await params;
  let title = paramsData.articleSlug.replaceAll("-", " ");
  title = title.charAt(0).toUpperCase() + title.slice(1) + " | Pet Clinic";

  return {
    title: title,
    description: title
  };
}

export default async function Page({ params }: {
  params: Promise<{
    roomName: string;
    articleSlug: string;
  }>;
}) {
  const paramsData = await params;
  const article = await getArticleBySlug(paramsData.articleSlug, paramsData.roomName);

  return (
    <PageContent article={article} />
  )
}
