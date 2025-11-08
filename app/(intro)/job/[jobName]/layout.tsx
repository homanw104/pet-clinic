import React from "react";
import { StaticImageData } from "next/image";
import { getAllArticleBriefs } from "@/utils/article_util";
import LayoutContent from "@/app/(intro)/job/[jobName]/layout-content";
import jobs from "@/contents/jobs";

export default async function Layout({ children, params }: {
  children: React.ReactNode
  params: Promise<{
    jobName: string;
  }>;
}) {
  const paramsData = await params;
  const jobName = paramsData.jobName;
  const jobData = jobs.find((job) => job.englishID === jobName) ?? {
    chineseTitle: "未知",
    englishID: "unknown",
    avatar: {} as StaticImageData
  };
  const imgSrc = jobData.avatar;
  const imgAlt = jobData.chineseTitle;
  const chineseTitle = jobData.chineseTitle;
  const englishID = jobData.englishID;
  const articleBriefList = await getAllArticleBriefs(jobName);

  return (
    <LayoutContent imgSrc={imgSrc} imgAlt={imgAlt} title={chineseTitle} subtitle={englishID} articleBriefList={articleBriefList}>
      {children}
    </LayoutContent>
  )
}
