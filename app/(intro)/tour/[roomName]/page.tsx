import PageContent from "@/app/(intro)/tour/[roomName]/page-content";
import RoomBriefType from "@/lib/types/roomBriefType";
import rooms from "@/lib/contents/rooms";
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
  let title = paramsData.roomName.replaceAll("-", " ");
  title = title.charAt(0).toUpperCase() + title.slice(1) + " | Pet Clinic";

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
  const roomBrief = rooms.find((room) => room.englishID === paramsData.roomName) ?? {
    chineseTitle: "未知",
    englishID: "unknown",
    panoSrc: "",
    panoMarkers: [],
  } as RoomBriefType;

  const panoSrc = roomBrief.panoSrc;
  const panoMarkers = roomBrief.panoMarkers;

  return (
    <PageContent panoSrc={panoSrc} panoMarkers={panoMarkers} />
  )
}
