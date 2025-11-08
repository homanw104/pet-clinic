/**
 * 导览主页，根据路径变量 [roomName] 生成各房间对应的主页。
 */

import { getAllArticleBriefs } from "@/utils/article_util";
import PageContent from "@/app/(intro)/tour/[roomName]/page-content";
import RoomBriefType from "@/types/roomBriefType";
import rooms from "@/contents/rooms";
import { Metadata } from "next";

export async function generateStaticParams() {
  let paramsList: { roomName: string }[] = [];

  for (const roomBrief of rooms) {
    paramsList.push({
      roomName: roomBrief.englishID
    })
  }

  return paramsList;
}

export async function generateMetadata({ params }: {
  params: Promise<{
    roomName: string;
  }>;
}): Promise<Metadata> {
  const paramsData = await params;
  let title = paramsData.roomName.replace("-", " ");
  title = "Pet Clinic - " + title.charAt(0).toUpperCase() + title.slice(1);

  return {
    title: title,
    description: title
  };
}

export default async function Page({ params }: {
  params: Promise<{
    roomName: string;
  }>;
}) {
  const paramsData = await params;
  const articleBriefList = await getAllArticleBriefs(paramsData.roomName);
  const roomBrief = rooms.find((room) => room.englishID === paramsData.roomName) ?? {
    chineseTitle: "未知",
    englishID: "unknown",
    panoSrc: "",
    panoMarkers: [],
  } as RoomBriefType;

  const chineseTitle = roomBrief.chineseTitle;
  const englishID = roomBrief.englishID;
  const panoSrc = roomBrief.panoSrc;
  const panoMarkers = roomBrief.panoMarkers;

  return (
    <PageContent chineseTitle={chineseTitle} englishID={englishID} articleList={articleBriefList}
                 panoSrc={panoSrc} panoMarkers={panoMarkers} />
  )
}
