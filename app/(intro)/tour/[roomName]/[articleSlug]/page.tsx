/**
 * 导览 article 页面，根据路径变量 [roomName] 和 [articleSlug] 生成各房间对应的各个 article。
 */

import { getAllArticleBriefs, getArticleBySlug, getArticleSlugs } from "@/utils/article_util";
import RoomBriefType from "@/types/roomBriefType";
import rooms from "@/contents/rooms";
import { Metadata } from "next";
import PageContent from "@/app/(intro)/tour/[roomName]/[articleSlug]/page-content";

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
  let title = paramsData.articleSlug.replace("-", " ");
  title = "Pet Clinic - " + title.charAt(0).toUpperCase() + title.slice(1);

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
  const articleBriefList = await getAllArticleBriefs(paramsData.roomName);
  const roomBrief = rooms.find((room) => room.englishID === paramsData.roomName) ?? {
    chineseTitle: "未知",
    englishID: "unknown",
    panoSrc: "",
    panoMarkers: [],
  } as RoomBriefType;

  const chineseTitle = roomBrief.chineseTitle;
  const englishID = roomBrief.englishID;

  return (
    <PageContent chineseTitle={chineseTitle} englishID={englishID} articleList={articleBriefList} article={article} />
  )
}
