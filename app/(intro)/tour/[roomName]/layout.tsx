import React from "react";
import { getAllArticleBriefs } from "@/lib/utils/article";
import rooms from "@/lib/contents/rooms";
import LayoutContent from "@/app/(intro)/tour/[roomName]/layout-content";

export default async function Layout({ children, params }: {
  children: React.ReactNode
  params: Promise<{
    roomName: string;
  }>;
}) {
  const paramsData = await params;
  const roomName = paramsData.roomName;
  const roomBrief = rooms.find((room) => room.englishID === roomName) ?? {
    chineseTitle: "未知",
    englishID: "unknown"
  };
  const chineseTitle = roomBrief.chineseTitle;
  const englishID = roomBrief.englishID;
  const articleBriefList = await getAllArticleBriefs(roomName);

  return (
    <LayoutContent title={chineseTitle} subtitle={englishID} articleBriefList={articleBriefList}>
      {children}
    </LayoutContent>
  )
}
